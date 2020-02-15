import * as Buffer from './buffer-utils.js'

describe('The buffer-utils library', function() {

    it('can pad an Uint8Array with zeros on the left', function() {
        const array = new Uint8Array([42, 43, 44])
        const padded = Buffer.padLeft(array, 16)
        const expected = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 43, 44])
        expect(padded).toEqual(expected)
    })

    it('can pad an Uint8Array with zeros on the right', function() {
        const array = new Uint8Array([42, 43, 44])
        const padded = Buffer.padRight(array, 16)
        const expected = new Uint8Array([42, 43, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        expect(padded).toEqual(expected)
    })

    it('can initialize an array repeating a particular byte', function() {
        const array = Buffer.repeat(0x5c, 8)
        const expected = new Uint8Array([0x5c, 0x5c, 0x5c, 0x5c, 0x5c, 0x5c, 0x5c, 0x5c])
        expect(array).toEqual(expected)
    })

})