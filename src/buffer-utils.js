/**
 *
 * Converts a buffer into a hex string.
 *
 * @param {Uint8Array|ArrayBuffer} buffer The buffer
 * @return {String} The hex string
 *
 */
export function toHex(buffer) {
    if (buffer instanceof ArrayBuffer) {
        buffer = new Uint8Array(buffer);
    }
    return Array.prototype.map.call(buffer, byteToHex).join('');
}

/**
 *
 * Converts one byte into two hex nibbles.
 *
 * @param {number} byte - The byte.
 * @return {String} The hex string
 *
 */
function byteToHex(byte) {
    // convert to hex string and pad a zero if necessary
    return ('0' + (byte & 0xFF).toString(16)).slice(-2); 
}


/**
 *
 * Converts a hex string into a buffer.
 *
 * @param {String} hexString The hex string
 * @return {Uint8Array} The buffer
 *
 */
export function fromHex(hexString) {
    let result = [];
    for (let i = 0; i < hexString.length; i += 2) {
        result.push(parseInt(hexString.substr(i, 2), 16));
    }
    return new Uint8Array(result);
}


/**
 *
 * Converts a buffer into a BigInt
 *
 * @param {Uint8Array} buffer -  The buffer to convert
 * @return {BigInt} The converted BigInt
 *
 */
export function toBigInt(buffer) {
    return BigInt('0x' + toHex(buffer));
}


/**
 *
 * Converts a BigInt into a buffer
 *
 * @param {BigInt} integer - The BigInt to convert
 * @return {Uint8Array} - The converted buffer
 *
 */
export function fromBigInt(integer) {
    let hex = BigInt(integer).toString(16);
    if (hex.length % 2) { hex = '0' + hex; }
    return fromHex(hex);
}


/**
 *
 * Converts a buffer into a Unicode string
 *
 * @param {Uint8Array} buffer - The buffer
 * @param {string} [encoding='utf-8'] - a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, GBK, etc.
 * @return {String} - The Unicode string
 *
 */
export function toUnicode(buffer, encoding = 'utf-8') {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(buffer);
}


/**
 *
 * Converts a Unicode string into a buffer
 *
 * @param {String} string The hex string
 * @param {string} [encoding='utf-8'] - a specific text encoding, such as UTF-8, ISO-8859-2, KOI8-R, GBK, etc.
 * @return {Uint8Array} The buffer
 *
 */
export function fromUnicode(string, encoding = 'utf-8') {
    const encoder = new TextEncoder(encoding);
    return encoder.encode(string);
}


/**
 *
 * Converts a buffer into a Base64 string
 *
 * @param {Uint8Array} buffer The buffer
 * @return {String} The Base64 string
 *
 */
export function toBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}


/**
 *
 * Converts a Base64 string into a buffer
 *
 * @param {String} string The Base64 string
 * @return {Uint8Array} The buffer
 *
 */
export function fromBase64(string) {
    return Uint8Array.from(atob(string), c => c.charCodeAt(0));
}


/**
 *
 * Converts a buffer into a Base64 string. Then it replaces plus and slashes.
 *
 * @param {Uint8Array} buffer The buffer
 * @return {String} The Base64 string
 *
 */
export function toBase64Clean(buffer) {
    return Buffer.toBase64(buffer).replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '');
}


/**
 *
 * Concatenates two buffers
 *
 * @param {Uint8Array} a The first buffer
 * @param {Uint8Array} b The second buffer
 * @return {ArrayBuffer} The concatenated buffer
 *
 */
export function concat(a, b) {
    return concatTypedArrays(
        new Uint8Array(a._buffer || a),
        new Uint8Array(b._buffer || b)
    ).buffer;
}

function concatTypedArrays(a, b) {
    const c = new(a.constructor)(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
}


/**
 *
 * Checks if two buffers are equal
 *
 * @param {Uint8Array} a The first buffer
 * @param {Uint8Array} b The second buffer
 * @return {Boolean} Result of the comparison
 *
 */
export function equals(a, b) {
    const viewA = new Uint8Array(a._buffer || a);
    const viewB = new Uint8Array(b._buffer || b);
    if (viewA.byteLength !== viewB.byteLength) return false;
    for (let i = 0; i < viewA.byteLength; i++) {
        if (viewA[i] !== viewB[i]) return false;
    }
    return true;
}


/**
 *
 * Returns an array of secure random bytes.
 *
 * @param {number} n - The number of bytes to return
 * @return {Uint8Array} - The random bytes
 *
 */
export function randomBytes(n){
    return crypto.getRandomValues(new Uint8Array(n));
}