import * as Utils from './buffer-utils.js';

/**
 * Convenience class for byte arrays
*/
export class Buffer extends Uint8Array {

    /**
     * 
     * Creates a Buffer.
     * @param {number|Array<number>} elements - The BigInt to convert.
     * 
     */
    constructor(elements) {
        super(elements)
    }

    /**
     * 
     * The number of bytes
     * @return {number} - The byte size.
     * 
     */
    size() {
        return this.buffer.byteLength
    }

    /**
     * 
     * Converts this to a hex string.
     * @return {string} - The converted hex string.
     * 
     */
    toHex() {
        return Utils.toHex(this.buffer)
    }

    /**
     * 
     * Converts a hex string to a Buffer.
     * @param {string} integer - The hex string to convert.
     * @return {Buffer} - The converted Buffer.
     * 
     */
    static fromHex(hexString) {
        return new this.prototype.constructor(Utils.fromHex(hexString))
    }

    /**
     * 
     * Converts this to a BigInt.
     * @return {BigInt} - The converted BigInt.
     * 
     */
    toBigInt() {
        return Utils.toHex(this)
    }

    /**
     * 
     * Converts a BigInt to a Buffer.
     * @param {BigInt} integer - The BigInt to convert.
     * @return {Buffer} - The converted Buffer.
     * 
     */
    static fromBigInt(integer) {
        return new this.prototype.constructor(Utils.fromBigInt(integer))
    }

    /**
     *
     * Converts a Buffer into a Unicode string
     *
     * @param {Uint8Array} buffer - The buffer
     * @param {string} [encoding='utf-8'] - a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, GBK, etc.
     * @return {String} - The Unicode string
     *
     */
    toUnicode(buffer, encoding) {
        return Utils.toUnicode(this, encoding)
    }

    /**
     *
     * Converts a Unicode string into a Buffer
     *
     * @param {String} string The hex string
     * @param {string} [encoding='utf-8'] - a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, GBK, etc.
     * @return {Uint8Array} The buffer
     *
     */
    static fromUnicode(string, encoding = 'utf-8') {
        return new this.prototype.constructor(Utils.fromUnicode(string, encoding))
    }
}