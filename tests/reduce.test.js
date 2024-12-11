import reduce from '../src/reduce'

describe('reduce', () => {
  // Array inputs 
  describe('with arrays', () => {
    test('reduces an array of numbers with initial value', () => {
      const numbers = [1, 2, 3, 4]
      const result = reduce(numbers, (sum, n) => sum + n, 0)
      expect(result).toBe(10)
    })

    test('reduces an array of numbers without initial value', () => {
      const numbers = [1, 2, 3, 4]
      const result = reduce(numbers, (sum, n) => sum + n)
      expect(result).toBe(10)
    })

    test('reduces array with single element without initial value', () => {
      const numbers = [5]
      const result = reduce(numbers, (sum, n) => sum + n)
      expect(result).toBe(5)
    })

    test('handles empty array with initial value', () => {
      const empty = []
      const result = reduce(empty, (sum, n) => sum + n, 0)
      expect(result).toBe(0)
    })

    test('handles array with all zero values', () => {
      const zeros = [0, 0, 0]
      const result = reduce(zeros, (sum, n) => sum + n, 0)
      expect(result).toBe(0)
    })

    test('processes array indices correctly', () => {
      const array = ['a', 'b', 'c']
      const indices = []
      reduce(array, (acc, value, index) => {
        indices.push(index)
        return acc
      }, null)
      expect(indices).toEqual([0, 1, 2])
    })
  })

  // Object inputs
  describe('with objects', () => {
    test('reduces object properties with initial value', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = reduce(obj, (sum, value) => sum + value, 0)
      expect(result).toBe(6)
    })

    test('reduces object without initial value', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const result = reduce(obj, (sum, value) => sum + value)
      expect(result).toBe(6)
    })

    test('handles empty object with initial value', () => {
      const empty = {}
      const result = reduce(empty, (sum, n) => sum + n, 0)
      expect(result).toBe(0)
    })

    test('processes object keys correctly', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const keys = []
      reduce(obj, (acc, value, key) => {
        keys.push(key)
        return acc
      }, null)
      expect(keys.sort()).toEqual(['a', 'b', 'c'])
    })

    test('groups values by property as shown in example', () => {
      const obj = { a: 1, b: 2, c: 1 }
      const result = reduce(obj, (result, value, key) => {
        (result[value] || (result[value] = [])).push(key)
        return result
      }, {})
      expect(result).toEqual({ '1': ['a', 'c'], '2': ['b'] })
    })
  })

  // Edge cases and boundary values
  describe('edge cases and boundary values', () => {
    test('handles null values in array', () => {
      const array = [null, null, 3]
      const result = reduce(array, (acc, val) => acc + (val || 0), 0)
      expect(result).toBe(3)
    })

    test('handles undefined values in array', () => {
      const array = [undefined, 1, undefined]
      const result = reduce(array, (acc, val) => acc + (val || 0), 0)
      expect(result).toBe(1)
    })

    test('handles mixed type values', () => {
      const mixed = [1, '2', 3, true]
      const result = reduce(mixed, (acc, val) => acc + Number(val), 0)
      expect(result).toBe(7) // 1 + 2 + 3 + 1
    })

    test('handles very large arrays', () => {
      const largeArray = Array(1000).fill(1)
      const result = reduce(largeArray, (sum, n) => sum + n, 0)
      expect(result).toBe(1000)
    })

    test('handles nested objects', () => {
      const nested = { a: { value: 1 }, b: { value: 2 } }
      const result = reduce(nested, (sum, obj) => sum + obj.value, 0)
      expect(result).toBe(3)
    })
  })

  // Error cases
  describe('error cases', () => {
    test('throws error when iteratee is not a function', () => {
      expect(() => {
        reduce([1, 2, 3], null, 0)
      }).toThrow()
    })
  })

  // special behaviours
  describe('special iteratee behaviors', () => {
    test('iteratee receives collection as fourth argument for arrays', () => {
      const array = [1, 2, 3]
      const collections = []
      reduce(array, (acc, value, index, collection) => {
        collections.push(collection)
        return acc
      }, 0)
      expect(collections.every(c => c === array)).toBe(true)
    })

    test('iteratee receives collection as fourth argument for objects', () => {
      const obj = { a: 1, b: 2 }
      const collections = []
      reduce(obj, (acc, value, key, collection) => {
        collections.push(collection)
        return acc
      }, 0)
      expect(collections.every(c => c === obj)).toBe(true)
    })

    test('maintains running accumulator value', () => {
      const array = [1, 2, 3, 4]
      const accumulatorValues = []
      reduce(array, (acc, value) => {
        accumulatorValues.push(acc)
        return acc + value
      }, 0)
      expect(accumulatorValues).toEqual([0, 1, 3, 6])
    })
  })
})