import eq from '../src/eq';

describe('eq', () => {
  // Primitive values
  describe('primitive values', () => {
    test('should compare numbers correctly', () => {
      expect(eq(1, 1)).toBe(true);
      expect(eq(1, 2)).toBe(false);
      expect(eq(0, 0)).toBe(true);
      
    });

    test('should compare positive and negative numbers', ()=>{
      expect(eq(-0, +0)).toBe(true);
      expect(eq(Infinity, Infinity)).toBe(true);
      expect(eq(Infinity, -Infinity)).toBe(false);
    })

    test('should handle NaN correctly', () => {
      expect(eq(NaN, NaN)).toBe(true);
      expect(eq(NaN, 0)).toBe(false);
      expect(eq(NaN, undefined)).toBe(false);
      expect(eq(NaN, null)).toBe(false);
    });

    test('should compare strings correctly', () => {
      expect(eq('', '')).toBe(true);
      expect(eq('a', 'a')).toBe(true);
      expect(eq('a', 'b')).toBe(false);      
    });

    test('should compare string and string', ()=> {
      expect(eq('1', '1')).toBe(true);
    })

    test('should compare string and number value', () => {
      expect(eq('1', 1)).toBe(false);
    })

    test('should compare string and truthy or falsy value', () => {
      expect(eq('1', true)).toBe(false);
      expect(eq('0', false)).toBe(false);
    })

    test('should compare booleans correctly', () => {
      expect(eq(true, true)).toBe(true);
      expect(eq(true, false)).toBe(false);
      expect(eq(true, 1)).toBe(false);
      expect(eq(false, 0)).toBe(false);
    });

    test('should handle null and undefined correctly', () => {
      expect(eq(null, null)).toBe(true);
      expect(eq(undefined, undefined)).toBe(true);
      expect(eq(null, undefined)).toBe(false);
      expect(eq(null, false)).toBe(false);
      expect(eq(undefined, false)).toBe(false);
      expect(eq(null, 0)).toBe(false);
      expect(eq(undefined, 0)).toBe(false);
    });
  });

  describe('objects and references', () => {
    test('should compare same object references correctly', () => {
      const obj = { a: 1 };
      const arr = [1, 2, 3];
      const fn = () => {};

      expect(eq(obj, obj)).toBe(true);
      expect(eq(arr, arr)).toBe(true);
      expect(eq(fn, fn)).toBe(true);
    });

    test('should compare different object references correctly', () => {
      expect(eq({ a: 1 }, { a: 1 })).toBe(false);
      expect(eq([1, 2, 3], [1, 2, 3])).toBe(false);
      expect(eq(() => {}, () => {})).toBe(false);
    });

    test('should handle object wrappers correctly', () => {
      expect(eq('a', Object('a'))).toBe(false);
      expect(eq(1, Object(1))).toBe(false);
      expect(eq(true, Object(true))).toBe(false);
    });
  });

  // Edge cases and special values
  describe('edge cases and special values', () => {
    test('should handle symbol values correctly', () => {
      const symbol1 = Symbol('test');
      const symbol2 = Symbol('test');
      
      expect(eq(symbol1, symbol1)).toBe(true);
      expect(eq(symbol1, symbol2)).toBe(false);
    });

    test('should handle mixed type comparisons correctly', () => {
      expect(eq(1, '1')).toBe(false);
      expect(eq(true, 'true')).toBe(false);
      expect(eq(null, 'null')).toBe(false);
      expect(eq(undefined, 'undefined')).toBe(false);
      expect(eq([], '')).toBe(false);
      expect(eq({}, '[object Object]')).toBe(false);
    });

    test('should handle Date objects correctly', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-01');
      
      expect(eq(date1, date1)).toBe(true);
      expect(eq(date1, date2)).toBe(false);
    });

    test('should handle RegExp objects correctly', () => {
      const regex1 = /test/;
      const regex2 = /test/;
      
      expect(eq(regex1, regex1)).toBe(true);
      expect(eq(regex1, regex2)).toBe(false);
    });
  });
});