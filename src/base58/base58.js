// Credits: https://gist.github.com/bellbind/1f07f94e5ce31557ef23dc2a9b3cc2e1
// https://en.bitcoin.it/wiki/Base58Check_encoding
// Bitcoin Base58 encoder/decoder algorithm
const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

// Base58 decoder/encoder for BigInt
function base58ToBigInt(chars, table = ALPHABET) {
    const carry = BigInt(table.length);
    let total = 0n,
        base = 1n;
    for (let i = chars.length - 1; i >= 0; i--) {
        const n = table.indexOf(chars[i]);
        if (n < 0) throw TypeError(`invalid letter contained: '${chars[i]}'`);
        total += base * BigInt(n);
        base *= carry;
    }
    return total;
}

function bigIntToBase58(num, table = ALPHABET) {
    const carry = BigInt(table.length);
    let r = [];
    while (num > 0n) {
        r.unshift(table[num % carry]);
        num /= carry;
    }
    return r;
}

// Base58 decoder/encoder for bytes
export function decode(str, table = ALPHABET) {
    const chars = [...str];
    const trails = chars.findIndex(c => c !== table[0]);
    const head0s = Array(trails).fill(0);
    if (trails === chars.length) return Uint8Array.from(head0s);
    const beBytes = [];
    let num = base58ToBigInt(chars.slice(trails), table);
    while (num > 0n) {
        beBytes.unshift(Number(num % 256n));
        num /= 256n;
    }
    return Uint8Array.from(head0s.concat(beBytes));
}

export function encode(beBytes, table = ALPHABET) {
    if (!(beBytes instanceof Uint8Array)) throw TypeError(`must be Uint8Array`);
    const trails = beBytes.findIndex(n => n !== 0);
    const head0s = table[0].repeat(trails);
    if (trails === beBytes.length) return head0s;
    const num = beBytes.slice(trails).reduce((r, n) => r * 256n + BigInt(n), 0n);
    return head0s + bigIntToBase58(num, table).join("");
}