import { Uint64 } from './serial-buffer.js'

describe('A Uint64', function() {

    it('can be serialized and deserialized', function() {
        const example = '4baf210000000000'
        const result = Uint64.fromHex(example).toHex()
        expect(result).toBe(example)
    })

    it('can be initialized with a Uint64', function() {
        const example = '4baf210000000000'
        const exampleUint64 = Uint64.fromHex(example)
        const result = new Uint64(exampleUint64)
        expect(result.toHex()).toBe(example)
    })

    it('can be initialized with a BigInt', function() {
        const example = 2207563n
        const result = new Uint64(example)
        expect(result.toHex()).toBe('4baf210000000000')
    })
})