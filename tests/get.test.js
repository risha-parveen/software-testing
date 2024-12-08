import get from '../src/get';

describe('get', () => {
  // Test object to be used across multiple tests
  const testObject = {
    a: [
      { b: { c: 3 } },
      { b: { c: 4 } }
    ],
    x: {
      y: {
        z: null
      }
    },
    empty: {},
    nullValue: null
  };

  describe('basic path resolution', () => {
    test('should get value using string path', () => {
      // Basic dot notation
      expect(get(testObject, 'a[0].b.c')).toBe(3);
      
      // Array bracket notation
      expect(get(testObject, 'a[1].b.c')).toBe(4);
    });

    test('should get value using array path', () => {
      // Array of path segments
      expect(get(testObject, ['a', '0', 'b', 'c'])).toBe(3);
    });
  });

  describe('edge cases and special values', () => {
    test('should handle null object', () => {
      // null object - special case
      expect(get(null, 'a.b.c')).toBe(undefined);
      expect(get(null, 'a.b.c', 'default')).toBe('default');
    });

    test('should handle undefined object', () => {
      // undefined object - special case
      expect(get(undefined, 'a.b.c')).toBe(undefined);
      expect(get(undefined, 'a.b.c', 'default')).toBe('default');
    });

    test('should handle null values in path', () => {
      // Path to null value
      expect(get(testObject, 'x.y.z')).toBe(null);
      
      // Path through null value
      expect(get(testObject, 'nullValue.prop')).toBe(undefined);
    });
  });

  describe('default value handling', () => {
    test('should return default value for undefined results', () => {
      // Non-existent path
      expect(get(testObject, 'a.b.c', 'default')).toBe('default');
      
      // Path to empty object
      expect(get(testObject, 'empty.nonexistent', 'default')).toBe('default');
    });

    test('should handle various default values', () => {
      // Various types of default values
      expect(get(testObject, 'nonexistent', null)).toBe(null);
      expect(get(testObject, 'nonexistent', 0)).toBe(0);
      expect(get(testObject, 'nonexistent', '')).toBe('');
    });
  });

  describe('path variations', () => {
    test('should handle different path formats', () => {
      const obj = { 'a.b': { c: 1 }, 'a': { 'b.c': 2 } };
      
      // Path with dots in property names
      expect(get(obj, ['a.b'])).toEqual({ c: 1 });
      expect(get(obj, ['a', 'b.c'])).toBe(2);
    });

    test('should handle empty path segments', () => {
      // Empty path components
      expect(get(testObject, '')).toBe(undefined);
      expect(get(testObject, [])).toBe(undefined);
    });
  });
});