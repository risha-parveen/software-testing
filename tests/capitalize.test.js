import capitalize from './capitalize'; // Assuming capitalize is the function to be tested


describe('capitalize function - Equivalence Classes', () => {

// Test for the Capitalize Equivalence Class

it('should capitalize the first letter of a lowercase string', () => {

const result = capitalize('hello');

expect(result).toEqual('Hello'); // The expected output after capitalization

});


// Test for the Lowercase Equivalence Class

it('should keep the string in lowercase if the first letter is already capitalized', () => {

const result = capitalize('HELLO');

expect(result).toEqual('Hello'); // It should return 'Hello' after capitalizing only the first letter

});


// Edge Case: Test for an empty string

it('should return an empty string when the input is empty', () => {

const result = capitalize('');

expect(result).toEqual(''); // An empty string should remain empty

});


// Edge Case: Test for a single character string

it('should capitalize a single lowercase character', () => {

const result = capitalize('h');

expect(result).toEqual('H'); // Single character should be capitalized

});


// Edge Case: Test for a single character string that is already uppercase

it('should return the uppercase character as is', () => {

const result = capitalize('H');

expect(result).toEqual('H'); // No changes needed for already capitalized character

});


// Edge Case: Test for string with leading/trailing spaces

it('should trim spaces and capitalize the first character', () => {

const result = capitalize(' hello ');

expect(result).toEqual('Hello'); // Leading/trailing spaces should be removed

});

});
