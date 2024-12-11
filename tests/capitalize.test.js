import capitalize from '../src/capitalize';

describe('capitalize', () => {
  describe('basic string capitalization', () => {
    test('should capitalize lowercase string', () => {
      expect(capitalize('fred')).toBe('Fred');
    });

    test('should handle uppercase string', () => {
      expect(capitalize('FRED')).toBe('Fred');
    });

    test('should handle mixed case string', () => {
      expect(capitalize('fRED')).toBe('Fred');
    });

    test('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });
  });

  describe('special characters', () => {
    test('should handle strings with spaces', () => {
      expect(capitalize('fred fred')).toBe('Fred fred');
    });

    test('should handle empty strings', ()=>{
      expect(capitalize('')).toBe('')
      expect(capitalize('    ')).toBe('    ')
    })

    test('should handle whitespace as first character', ()=>{
      expect(capitalize('  fRED')).toBe('  Fred')
    })

    test('should handle strings with special characters', () => {
      expect(capitalize('$special')).toBe('$special');
      expect(capitalize('123abc')).toBe('123abc');
    });
  });
});