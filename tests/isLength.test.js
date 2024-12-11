import isLength from '../src/isLength'

describe('isLength', () => {
  // Valid cases - testing true conditions
  test('returns true for valid lengths', () => {
    expect(isLength(0)).toBe(true)          
    expect(isLength(3)).toBe(true)          
    expect(isLength(9007199254740991)).toBe(true)  // MAX_SAFE_INTEGER
  })

  // Type check failures
  test('returns false for non-numbers', () => {
    expect(isLength('3')).toBe(false)       
    expect(isLength(null)).toBe(false)      
    expect(isLength(undefined)).toBe(false) 
    expect(isLength({})).toBe(false)        
  })

  // Value range check failures
  test('returns false for invalid numbers', () => {
    expect(isLength(-1)).toBe(false)        
    expect(isLength(3.14)).toBe(false)      
    expect(isLength(Infinity)).toBe(false)  
    expect(isLength(9007199254740992)).toBe(false) 
  })
})