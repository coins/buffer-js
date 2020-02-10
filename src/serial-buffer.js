import * as Buffer from './buffer-utils.js';

export class Uint extends Number {

    constructor(value) {
        super(value);
        this.hex = '0x' + value.toString(16)
    }

    write(writer) {
        const mask = this.constructor.mask;
        writer.writeBytes(new mask([this]).buffer);
    }

    static read(reader) {
        const bytes = reader.readBytes(this.type.byteLength());
        const mask = this.type.mask;
        return new this.type(new mask(bytes.buffer)[0]);
    }

    static get type() {
        return this.prototype.constructor
    }

    byteLength() {
        return this.constructor.byteLength()
    }
}

export class Uint8 extends Uint {

    static get mask() { return Uint8Array; }

    static byteLength() { return 1; }
}

export class Uint16 extends Uint {

    static get mask() { return Uint16Array; }

    static byteLength() { return 2; }
}

export class Uint32 extends Uint {

    static get mask() { return Uint32Array; }

    static byteLength() { return 4; }
}

export class Uint64 {

    constructor(value) {
        this.value = BigInt(value.value || !(value.value === 0) || value)
    }

    write(writer) {
        writer.writeBytes(new BigInt64Array([this.value]).buffer);
    }

    static read(reader) {
        const bytes = reader.readBytes(this.byteLength()).buffer;
        return new this(new BigInt64Array(bytes)[0]);
    }

    static byteLength() { return 8; }

    byteLength() { return 8; }
}

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
            writer.writeByte(0xfd);
        } else if (this.uint instanceof Uint32) {
            writer.writeByte(0xfe);
        } else if (this.uint instanceof Uint64) {
            writer.writeByte(0xff);
        }
        this.uint.write(writer);
    }

    toHex() {
        const writer = new HexWriter();
        this.write(writer);
        return writer.result();
    }


    static read(reader) {
        const firstByte = Uint8.read(reader);
        if (firstByte < 0xfd)
            return new VarInt(firstByte);
        switch (Number(firstByte)) {
            case 0xfd:
                return new VarInt(Uint16.read(reader));
            case 0xfe:
                return new VarInt(Uint32.read(reader));
            case 0xff:
                return new VarInt(Uint64.read(reader));
        }
    }

}



export class SerialWriter {

    constructor(buffer, mode) {
        this._buffer = buffer;
        this._cursor = 0;
        this.mode = mode;
    }

    writeByte(byte) {
        if (this._cursor >= this._buffer.byteLength)
            throw new Error('Out of bounds write');
        this._buffer[this._cursor] = byte;
        this._cursor += 1;
    }

    writeBytes(bytes) {
        bytes = new Uint8Array(bytes);
        for (let i = 0; i < bytes.length; i++) {
            this.writeByte(bytes[i])
        }
    }

    result() {
        return this._buffer;
    }
}

export class HexWriter extends SerialWriter {

    constructor(buffer, mode) {
        super(buffer, mode);
        this._hex = '';
    }

    writeByte(byte) {
        this._hex += byteToHex(byte);
    }

    result() {
        return this._hex;
    }
}

export class SerialReader {

    constructor(buffer) {
        this._buffer = buffer._buffer || buffer;
        this.meta = {};
    }

    readBytes(n) {
        if (n > this._buffer.length)
            throw new Error('Out of bounds read');
        const res = this._buffer.slice(0, n)
        this._buffer = this._buffer.slice(n);
        return res
    }

    isEmpty() {
        return this._buffer.length == 0;
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