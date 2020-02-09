import * as Utils from './buffer-utils.js';


/**
    
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

}