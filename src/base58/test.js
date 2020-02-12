import * as Base58 from './base58.js'
import { Buffer } from '../buffer.js'

// TODO: add more test vectors from https://github.com/bitcoin/bitcoin/blob/master/src/test/base58_tests.cpp
describe('The base58 library', function() {

    it('can encode and decode a Buffer', function() {
        const example = Buffer.fromUnicode('Hello World!')
        const result = Base58.decode(Base58.encode(example))
        expect(example.equals(result)).toBe(true)
    })

})