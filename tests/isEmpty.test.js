import isEmpty from '../src/isEmpty'

describe('isEmpty', () => {
  describe('null/undefined values', () => {
    test('should return true for null', () => {
      expect(isEmpty(null)).toBe(true)
    })

    test('should return true for undefined', () => {
      expect(isEmpty(undefined)).toBe(true)
    })
  })

  describe('primitive values', () => {
    test('should return true for boolean values', () => {
      expect(isEmpty(true)).toBe(true)
      expect(isEmpty(false)).toBe(true)
    })

    test('should return true for numbers', () => {
      expect(isEmpty(0)).toBe(true)
      expect(isEmpty(1)).toBe(true)
      expect(isEmpty(NaN)).toBe(true)
      expect(isEmpty(Infinity)).toBe(true)
    })
  })

  // Array-like objects
  describe('array-like objects', () => {
    test('should return true for empty arrays', () => {
      expect(isEmpty([])).toBe(true)
    })

    test('should return false for non-empty arrays', () => {
      expect(isEmpty([1, 2, 3])).toBe(false)
      expect(isEmpty([null])).toBe(false)
    })

    test('should return true for empty string', () => {
      expect(isEmpty('')).toBe(true)
    })

    test('should return false for non-empty string', () => {
      expect(isEmpty('abc')).toBe(false)
      expect(isEmpty(' ')).toBe(false)
    })

    test('should handle array-like objects', () => {
      function testFunc() {
        return isEmpty(arguments)
      }
      expect(testFunc()).toBe(true)
      expect(testFunc(1, 2)).toBe(false)
    })

    test('should handle typed arrays', () => {
      expect(isEmpty(new Int8Array())).toBe(true)
      expect(isEmpty(new Int8Array([1, 2]))).toBe(false)
    })
  })

  describe('objects and collections', () => {
    test('should return true for empty objects', () => {
      expect(isEmpty({})).toBe(true)
    })

    test('should return false for non-empty objects', () => {
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty({ length: 0 })).toBe(false)
    })

    test('should handle Map objects', () => {
      expect(isEmpty(new Map())).toBe(true)
      const nonEmptyMap = new Map()
      nonEmptyMap.set('a', 1)
      expect(isEmpty(nonEmptyMap)).toBe(false)
    })

    test('should handle Set objects', () => {
      expect(isEmpty(new Set())).toBe(true)
      const nonEmptySet = new Set()
      nonEmptySet.add(1)
      expect(isEmpty(nonEmptySet)).toBe(false)
    })
  })

  // Edge cases
  describe('edge cases', () => {
    test('should handle objects with no prototype', () => {
      expect(isEmpty(Object.create(null))).toBe(true)
    })

    test('should handle objects with inherited enumerable properties', () => {
      function Custom() {}
      Custom.prototype.a = 1
      expect(isEmpty(new Custom())).toBe(true)
    })

    test('should handle prototype objects', () => {
      function TestConstructor() {}
      const proto = TestConstructor.prototype;
      expect(isEmpty(proto)).toBe(true);
      
      // Add a property to verify it's not empty after adding properties
      proto.testProp = 'test';
      expect(isEmpty(proto)).toBe(false);
    });
  })
})