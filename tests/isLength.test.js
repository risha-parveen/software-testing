import isLength from '../src/isLength'

describe('isLength', () => {
  // Valid cases - testing true conditions
  test('returns true for valid lengths', () => {
    expect(isLength(0)).toBe(true)          // Minimal valid value
    expect(isLength(3)).toBe(true)          // Typical valid value
    expect(isLength(9007199254740991)).toBe(true)  // MAX_SAFE_INTEGER
  })

  // Type check failures
  test('returns false for non-numbers', () => {
    expect(isLength('3')).toBe(false)       // String
    expect(isLength(null)).toBe(false)      // Null
    expect(isLength(undefined)).toBe(false) // Undefined
    expect(isLength({})).toBe(false)        // Object
  })

  // Value range check failures
  test('returns false for invalid numbers', () => {
    expect(isLength(-1)).toBe(false)        // Negative number
    expect(isLength(3.14)).toBe(false)      // Float
    expect(isLength(Infinity)).toBe(false)  // Infinity
    expect(isLength(9007199254740992)).toBe(false) // > MAX_SAFE_INTEGER
  })
})