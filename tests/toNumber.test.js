import toNumber from '../src/toNumber';

describe('toNumber', () => {
  describe('number inputs', () => {
    test('should return numbers unchanged', () => {
      // Regular numbers - main equivalence class
      expect(toNumber(3.2)).toBe(3.2);
      
      // Special numeric values - boundary cases
      expect(toNumber(0)).toBe(0);
      expect(toNumber(Infinity)).toBe(Infinity);
      expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    });
  });

  describe('string conversion', () => {
    test('should convert numeric strings', () => {
      // Basic numeric strings
      expect(toNumber('3.2')).toBe(3.2);
      expect(toNumber('-5')).toBe(-5);

      // Whitespace handling
      expect(toNumber('  3.2  ')).toBe(3.2);
    });

    test('should handle special number formats', () => {
      // Binary
      expect(toNumber('0b101')).toBe(5);
      expect(toNumber('0B101')).toBe(5);

      // Octal
      expect(toNumber('0o7')).toBe(7);
      expect(toNumber('0O10')).toBe(8);

      // Bad hex (should return NaN)
      expect(toNumber('-0x1')).toBe(NaN);
      expect(toNumber('+0x1')).toBe(NaN);
    });
  });

  describe('object conversion', () => {
    test('should handle objects with valueOf', () => {
      // Object with valueOf
      const obj = {
        valueOf: () => 3.2
      };
      expect(toNumber(obj)).toBe(3.2);

      // Nested valueOf case
      const nestedObj = {
        valueOf: () => ({
          valueOf: () => 4.2
        })
      };
      expect(toNumber(nestedObj)).toBe(4.2);
    });

    test('should convert object to string if no valid valueOf', () => {
      const obj = {
        toString: () => '3.2'
      };
      expect(toNumber(obj)).toBe(3.2);
    });

    test('should handle objects without valueOf', () => {
      // This case ensures we hit the value.valueOf === 'function' check
      const objWithoutValueOf = Object.create(null);
      expect(toNumber(objWithoutValueOf)).toBe(NaN);
    });
  });

  describe('direct value conversion', () => {
    test('should handle non-string numeric conversions', () => {
      // These cases should hit the typeof value !== 'string' branch
      const numberLikeObject = {
        valueOf() { return 42; }
      };
      expect(toNumber(numberLikeObject)).toBe(42);
  
      // Test the value === 0 condition
      const zeroObject = {
        valueOf() { return 0; }
      };
      expect(toNumber(zeroObject)).toBe(0);
  
      // Test array that converts to empty string and then 0
      expect(toNumber([])).toBe(0);
      
      // Test array that converts to non-zero
      expect(toNumber([1])).toBe(1);
    });
  });

  describe('edge cases', () => {
    test('should handle non-convertible values', () => {
      // Symbol handling
      expect(toNumber(Symbol('test'))).toBe(NaN);

      // null/undefined handling
      expect(toNumber(null)).toBe(0);
      expect(toNumber(undefined)).toBe(NaN);

      // Invalid string formats
      expect(toNumber('abc')).toBe(NaN);
      expect(toNumber('')).toBe(0);
    });

    test('should handle boolean values', () => {
      expect(toNumber(true)).toBe(1);
      expect(toNumber(false)).toBe(0);
    });
  });
});