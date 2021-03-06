import * as Utils from '../buffer-utils/buffer-utils.js';

/** 
 * Convenience class for byte arrays
 */
export class Buffer extends Uint8Array {

    /**
     * 
     * Creates a Buffer.
     * @param {Number|Array<Number>} elements - a byte array or array length.
     * 
     */
    constructor(elements) {
        super(elements)
    }

    /**
     * 
     * The number of bytes
     * @return {Number} - The byte size.
     * 
     */
    size() {
        return this.buffer.byteLength
    }

    /**
     * 
     * Converts this to a hex string.
     * @return {String} - The converted hex string.
     * 
     */
    toHex() {
        return Utils.toHex(this.buffer)
    }

    /**
     * 
     * Converts a hex string to a Buffer.
     * @param {String} integer - The hex string to convert.
     * @return {Buffer} - The converted Buffer.
     * 
     */
    static fromHex(hexString) {
        return new this.prototype.constructor(Utils.fromHex(hexString).buffer)
    }

    /**
     * 
     * Converts this to a BigInt.
     * @return {BigInt} - The converted BigInt.
     * 
     */
    toBigInt() {
        return Utils.toBigInt(this)
    }

    /**
     * 
     * Converts a BigInt to a Buffer.
     * @param {BigInt} integer - The BigInt to convert.
     * @return {Buffer} - The converted Buffer.
     * 
     */
    static fromBigInt(integer) {
        return new this.prototype.constructor(Utils.fromBigInt(integer).buffer)
    }

    /**
     *
     * Converts a Buffer into a Unicode string
     *
     * @param {Uint8Array} buffer - The buffer
     * @param {String?} encoding - a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, GBK, etc.
     * @return {String} - The Unicode string
     *
     */
    toUnicode(buffer, encoding = 'utf-8') {
        return Utils.toUnicode(this, encoding)
    }

    /**
     *
     * Converts a Unicode string into a Buffer
     *
     * @param {String} string - The hex string
     * @param {String?} [encoding='utf-8'] - a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, GBK, etc.
     * @return {Buffer} - The buffer
     *
     */
    static fromUnicode(string, encoding = 'utf-8') {
        return new this.prototype.constructor(Utils.fromUnicode(string, encoding))
    }


    /**
     *
     * Converts a Buffer into a Base64 string
     *
     * @param {Uint8Array} buffer The buffer
     * @return {String} - The Base64 string
     *
     */
    toBase64() {
        return Utils.toBase64(this)
    }

    /**
     *
     * Converts a Base64 string into a Buffer
     *
     * @param {String} string The Base64 string
     * @return {Buffer} - The buffer
     *
     */
    static fromBase64(string) {
        return new this.prototype.constructor(Utils.fromBase64(string))
    }

    /**
     *
     * Returns a copy of this Buffer in reversed order.
     * @return {Buffer} - The buffer
     *
     */
    reverse() {
        return new this.constructor(super.reverse().buffer)
    }


    /**
     *
     * Returns a shallow copy of a portion of an array into a new array object
     * selected from begin to end (end not included) where begin 
     * and end represent the index of items in that array. 
     * The original array will not be modified.
     * 
     * @return {Buffer} - The buffer
     *
     */
    slice(begin, end) {
        return new this.constructor(super.slice(begin, end).buffer)
    }

    /**
     *
     * Checks if another buffer is equal to this.
     *
     * @param {Buffer} other - The other buffer.
     * @return {Boolean} - Result of the comparison.
     *
     */
    equals(other) {
        return Utils.equals(this, other)
    }


    /**
     *
     * Converts this Buffer into a Base58 string
     *
     * @return {String} - The Base58 string
     *
     */
    toBase58() {
        return Utils.toBase58(this)
    }


    /** 
     * Convert this buffer into a binary string.
     * 
     * @return {String}     The binary string.
     */
    toBinary() {
        return Utils.toBinary(this)
    }

    /**
     *
     * Converts a Base58 string into a Buffer
     *
     * @param {String} string The Base58 string
     * @return {Buffer} - The buffer
     *
     */
    static fromBase58(string) {
        return new this.prototype.constructor(Utils.fromBase58(string))
    }


    /**
     *
     * Returns a Buffer of secure random bytes.
     *
     * @param {Number} n - The number of bytes to return
     * @return {Buffer} - The random bytes
     *
     */
    static randomBytes(n) {
        return new this.prototype.constructor(Utils.randomBytes(n))
    }

}