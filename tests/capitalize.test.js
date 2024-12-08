import capitalize from '../src/capitalize';

describe('capitalize', () => {
  describe('basic string capitalization', () => {
    test('should capitalize lowercase string', () => {
      // Basic lowercase string - main equivalence class
      expect(capitalize('fred')).toBe('Fred');
    });

    test('should handle uppercase string', () => {
      // Uppercase string - tests both upper->lower and first char upper
      expect(capitalize('FRED')).toBe('Fred');
    });

    test('should handle mixed case string', () => {
      // Mixed case - verifies entire string transformation
      expect(capitalize('fRED')).toBe('Fred');
    });
  });

  describe('edge cases', () => {
    test('should handle empty string', () => {
      // Empty string - boundary case
      expect(capitalize('')).toBe('');
    });

    test('should handle single character strings', () => {
      // Single character - boundary case
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    test('should handle non-string inputs', () => {
      // Various non-string types - tests toString conversion
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
      expect(capitalize(123)).toBe('123');
      expect(capitalize(true)).toBe('True');
      expect(capitalize(false)).toBe('False');
    });
  });

  describe('special characters', () => {
    test('should handle strings with spaces', () => {
      // String with spaces - verifies word boundary handling
      expect(capitalize('fred flintstone')).toBe('Fred flintstone');
    });

    test('should handle strings with special characters', () => {
      // Special characters - edge case for character handling
      expect(capitalize('$special')).toBe('$special');
      expect(capitalize('123abc')).toBe('123abc');
    });
  });
});