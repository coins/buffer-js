import * as Buffer from '../buffer-utils/buffer-utils.js'

export class SerialBuffer {

    /**
     * Read bytes from a reader.
     * @param {SerialReader} reader - The Reader to read from.
     * @return {SerialBuffer} - The read SerialBuffer instance.
     */
    static read(reader) {
        throw Error('Abstract method!')
    }

    /**
     * Write all bytes to a writer.
     * @param {SerialWriter} writer - the Writer to write to.
     */
    write(writer) {
        throw Error('Abstract method!')
    }

    /**
     * The number of bytes
     * @return {Number} - The number of bytes.
     */
    byteLength() {
        throw Error('Abstract method!')
    }

    /**
     * Write all bytes into a hex string.
     * @return {string} - the hex string.
     */
    toHex() {
        const writer = new HexWriter()
        this.write(writer)
        return writer.result()
    }

    /**
     * Read bytes from a hex string.
     * @return {SerialBuffer} hexString - the hex string.
     */
    static fromHex(hexString) {
        const object = this.prototype.constructor.read(new HexReader(hexString))
        return object
    }

    /**
     * Writes all bytes into an Uint8Array.
     * @return {Uint8Array} 
     */
    toBuffer() {
        const buffer = new Uint8Array(this.byteLength())
        const writer = new SerialWriter(buffer)
        this.write(writer)
        return writer.result()
    }
}

/**
 * Abstract base class for Unsigned integers like Uint8, Uint16, Uint32, etc.
 * @class
 * @abstract
 */
export class Uint extends Number {

    toHex() {
        let hex = this.toString(16)
        // pad to full byte
        if (hex.length % 2) hex = '0' + hex
        // pad with zeros in little endian            
        while (hex.length < this.byteLength() * 2) {
            hex = hex + '0'
        }
        return hex
    }

    write(writer) {
        const mask = this.constructor.mask
        writer.writeBytes(new mask([this]).buffer)
    }

    static read(reader) {
        const bytes = reader.readBytes(this.type.byteLength())
        const mask = this.type.mask
        return new this.type(new mask(bytes.buffer)[0])
    }

    static get type() {
        return this.prototype.constructor
    }

    byteLength() {
        return this.constructor.byteLength()
    }
}

/**
 * Unsigned integer of 1 bytes. 
 */
export class Uint8 extends Uint {

    static get mask() { return Uint8Array }

    static byteLength() { return 1 }
}

/**
 * Unsigned integer of 2 bytes. 
 */
export class Uint16 extends Uint {

    static get mask() { return Uint16Array }

    static byteLength() { return 2 }
}

/**
 * Unsigned integer of 4 bytes. 
 */
export class Uint32 extends Uint {

    static get mask() { return Uint32Array }

    static byteLength() { return 4 }
}

/**
 * Unsigned integer of 8 bytes. 
 */
export class Uint64 extends SerialBuffer {

    /**
     * The integer to represent.
     * @type {Number}
     */
    // value

    constructor(value) {
        super()
        if (value instanceof Uint64)
            value = value.value
        this.value = value
    }

    write(writer) {
        writer.writeBytes(new BigInt64Array([this.value]).buffer)
    }

    static read(reader) {
        const bytes = reader.readBytes(this.byteLength()).buffer
        return new this(new BigInt64Array(bytes)[0])
    }

    static byteLength() { return 8 }

    byteLength() { return 8 }
}

/**
 * Unsigned integer of variable length.
 */
export class VarInt extends Number {

    constructor(uint) {
        super(Number(uint))
        if (uint < 0xfd) {
            this.uint = new Uint8(uint);
        } else if (uint < 0xffff) {
            this.uint = new Uint16(uint)
        } else if (uint < 0xffffffff) {
            this.uint = new Uint32(uint)
        } else {
            this.uint = new Uint64(uint)
        }
    }

    byteLength() {
        const size = this.uint.byteLength();
        return size + (size > 1 ? 1 : 0);
    }

    write(writer) {
        if (this.uint instanceof Uint16) {
            writer.writeByte(0xfd)
        } else if (this.uint instanceof Uint32) {
            writer.writeByte(0xfe)
        } else if (this.uint instanceof Uint64) {
            writer.writeByte(0xff)
        }
        this.uint.write(writer)
    }

    toHex() {
        const writer = new HexWriter();
        this.write(writer);
        return writer.result();
    }


    static read(reader) {
        const firstByte = Uint8.read(reader)
        if (firstByte < 0xfd)
            return new VarInt(firstByte)
        switch (Number(firstByte)) {
            case 0xfd:
                return new VarInt(Uint16.read(reader))
            case 0xfe:
                return new VarInt(Uint32.read(reader))
            case 0xff:
                return new VarInt(Uint64.read(reader))
        }
    }

}



export class SerialWriter {

    constructor(buffer, mode) {
        this._buffer = buffer
        this._cursor = 0
        this.mode = mode
    }

    writeByte(byte) {
        if (this._cursor >= this._buffer.byteLength)
            throw Error('Out of bounds write')
        this._buffer[this._cursor] = byte
        this._cursor += 1
    }

    writeBytes(bytes) {
        bytes = new Uint8Array(bytes);
        for (let i = 0; i < bytes.length; i++) {
            this.writeByte(bytes[i])
        }
    }

    result() {
        return this._buffer
    }
}

export class HexWriter extends SerialWriter {

    constructor(buffer, mode) {
        super(buffer, mode)
        this._hex = ''
    }

    writeByte(byte) {
        this._hex += Buffer.byteToHex(byte)
    }

    result() {
        return this._hex
    }
}

export class SerialReader {

    constructor(buffer) {
        this._buffer = buffer._buffer || buffer
        this.meta = {};
    }

    readBytes(n) {
        if (n > this._buffer.length)
            throw Error('Out of bounds read');
        const res = this._buffer.slice(0, n)
        this._buffer = this._buffer.slice(n);
        return res
    }

    isEmpty() {
        return this._buffer.length === 0
    }

    bytesRemaining() {
        return this._buffer.length;
    }
}

export class HexReader extends SerialReader {
    constructor(hex) {
        super(Buffer.fromHex(hex))
    }
}