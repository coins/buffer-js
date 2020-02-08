function byteToHex(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
}

function bufferToHex(buffer) {
    return Array.prototype.map.call(buffer, byteToHex).join('');
}

function hexToBuffer(hexString) {
    let result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        result.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(result)
}

function bufferToBigInt(buffer) {
    return BigInt('0x' + bufferToHex(buffer));
}

class Buffer {

    constructor(buffer) {
        this._buffer = buffer;
        this._hex = this.toHex()
    }

    static fromHex(hexString) {
        return new this.prototype.constructor(hexToBuffer(hexString))
    }

    toHex() {
        return bufferToHex(this._buffer);
    }

    byteLength() {
        return this._buffer.byteLength
    }

    write(writer) {
        writer.writeBytes(this._buffer);
    }

    toUnicode(encoding = 'utf-8') {
        const decoder = new TextDecoder(encoding);
        return decoder.decode(this._buffer.slice(0).reverse());
    }

    toBigInt() {
        return BigInt('0x' + this.toHex());
    }

    static concatTypedArrays(a, b) {
        const c = new(a.constructor)(a.length + b.length);
        c.set(a, 0);
        c.set(b, a.length);
        return c;
    }

    static concat(a, b) {
        return Buffer.concatTypedArrays(
            new Uint8Array(a._buffer || a),
            new Uint8Array(b._buffer || b)
        ).buffer;
    }

    static equals(a, b) {
        const viewA = new Uint8Array(a._buffer || a);
        const viewB = new Uint8Array(b._buffer || b);
        if (viewA.byteLength !== viewB.byteLength) return false;
        for (let i = 0; i < viewA.byteLength; i++) {
            if (viewA[i] !== viewB[i]) return false;
        }
        return true;
    }
}