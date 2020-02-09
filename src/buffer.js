import * as Utils from './buffer-utils.js';

export class Buffer extends Uint8Array {

    constructor(elements) {
        super(elements)
    }

    length() {
        return this.buffer.byteLength
    }

    toHex() {
        return Utils.toHex(this.buffer)
    }

    static fromHex(hexString) {
        return new this.prototype.constructor(Utils.fromHex(hexString))
    }

    toBigInt() {
        return Utils.toHex(this)
    }

    static fromBigInt(integer) {
        return new this.prototype.constructor(Utils.fromBigInt(integer))
    }

}






// class Writer {

//     constructor(buffer, mode) {
//         this._buffer = buffer;
//         this._cursor = 0;
//         this.mode = mode;
//     }

//     writeByte(byte) {
//         if (this._cursor >= this._buffer.byteLength)
//             throw new Error('Out of bounds write');
//         this._buffer[this._cursor] = byte;
//         this._cursor += 1;
//     }

//     writeBytes(bytes) {
//         bytes = new Uint8Array(bytes);
//         for (let i = 0; i < bytes.length; i++) {
//             this.writeByte(bytes[i])
//         }
//     }

//     result() {
//         return this._buffer;
//     }
// }

// class HexWriter extends Writer {

//     constructor(buffer, mode) {
//         super(buffer, mode);
//         this._hex = '';
//     }

//     writeByte(byte) {
//         this._hex += byteToHex(byte);
//     }

//     result() {
//         return this._hex;
//     }
// }

// class Reader {

//     constructor(buffer) {
//         this._buffer = buffer._buffer || buffer;
//         this.meta = {};
//     }

//     readBytes(n) {
//         if (n > this._buffer.length)
//             throw new Error('Out of bounds read');
//         const res = this._buffer.slice(0, n)
//         this._buffer = this._buffer.slice(n);
//         return res
//     }

//     isEmpty() {
//         return this._buffer.length == 0;
//     }

//     bytesRemaining() {
//         return this._buffer.length;
//     }
// }

// class HexReader extends Reader {
//     constructor(hex) {
//         super(Buffer.fromHex(hex))
//     }
// }