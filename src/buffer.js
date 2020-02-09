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

