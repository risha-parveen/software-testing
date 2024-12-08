import map from '../src/map';

describe('map', () => {
  // Test basic functionality with valid inputs
  describe('basic mapping', () => {
    test('should map values using iteratee', () => {
      const square = n => n * n;
      // Test with simple array - representative of normal case
      expect(map([2, 4], square)).toEqual([4, 16]);
    });

    test('should provide correct arguments to iteratee', () => {
      const args = [];
      // Single element array to capture iteratee arguments
      map(['a'], (value, index, array) => {
        args.push({ value, index, array });
      });
      
      expect(args[0]).toEqual({
        value: 'a',
        index: 0,
        array: ['a']
      });
    });
  });

  // Test edge cases and boundary values
  describe('edge cases', () => {
    test('should handle empty array', () => {
      // Empty array - boundary case
      expect(map([], x => x * 2)).toEqual([]);
    });

    test('should handle null/undefined arrays', () => {
      // null/undefined - special cases
      expect(map(null, x => x)).toEqual([]);
      expect(map(undefined, x => x)).toEqual([]);
    });

    test('should handle array with falsy values', () => {
      // Array with falsy values - edge case
      const falsyValues = [0, '', false, null, undefined, NaN];
      const result = map(falsyValues, x => typeof x);
      expect(result).toEqual([
        'number',
        'string',
        'boolean',
        'object',
        'undefined',
        'number'
      ]);
    });
  });

  // Test different types of iteratees
  describe('iteratee variations', () => {
    test('should work with different iteratee types', () => {
      const array = [1, 2];
      
      // Identity function
      expect(map(array, x => x)).toEqual([1, 2]);
      
      // Transformation function
      expect(map(array, x => String(x))).toEqual(['1', '2']);
      
      // Function using index
      expect(map(array, (_, i) => i)).toEqual([0, 1]);
    });
  });

  // Test array mutation and reference handling
  describe('array handling', () => {
    test('should not mutate original array', () => {
      const original = [1, 2];
      const result = map(original, x => x * 2);
      
      expect(original).toEqual([1, 2]);
      expect(result).toEqual([2, 4]);
      expect(result).not.toBe(original);
    });

    test('should handle arrays with object references', () => {
      const obj = { value: 1 };
      const arr = [obj];
      
      // Mapping with object reference
      const result = map(arr, x => x);
      expect(result[0]).toBe(obj);
    });
  });
});