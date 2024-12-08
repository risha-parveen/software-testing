import isObject from '../src/isObject'

test('identifies basic objects correctly', () => {
  expect(isObject({})).toBe(true)
  expect(isObject([1, 2, 3])).toBe(true)
  expect(isObject(new Date())).toBe(true)
})

test('identifies functions correctly', () => {
  expect(isObject(() => {})).toBe(true)
  expect(isObject(function() {})).toBe(true)
  expect(isObject(new Function())).toBe(true)
})

test('rejects non-objects correctly', () => {
  expect(isObject(null)).toBe(false)
  expect(isObject(undefined)).toBe(false)
  expect(isObject('string')).toBe(false)
  expect(isObject(123)).toBe(false)
})

test('potential failing case with custom object', () => {
  const customObj = Object.create(null)
  customObj.toString = null
  expect(isObject(customObj)).toBe(true) 
})