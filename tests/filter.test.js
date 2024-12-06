import filter from './filter'; // Importing the filter function


// Mock data to simulate the product database

const products = [

{ name: 'Organic Blueberries', category: 'Organic', price: 10.00, producer: 'Great Farms', contents: 'Fruit' },

{ name: ' Dairy Milk', category: 'Dairy', price: 5.00, producer: 'Dairy Product', contents: 'Dairy' },

{ name: ' Dairy Cheese', category: 'Dairy', price: 8.20, producer: 'Dairy Product', contents: 'Dairy' },

{ name: ' Organic Apples', category: 'Dairy', price: 5.00, producer: 'Great Farms', contents: 'Fruit' },

];


// Test for filtering the product with specific properties

describe('filter function - Specific Product Filter', () => {

it('should filter products by name, category, price, producer, and contents', () => {

// Predicate: Filter products matching specific properties

const specificProductFilter = (product) =>

product.category === 'Dairy' &&

product.price === 5.00 &&

product.producer === 'Dairy Product' &&

product.contents === 'Dairy';


const result = filter(products, specificProductFilter);


// Expected: Only the product matching the specific properties

expect(result).toEqual([

{ name: 'Dairy Milk', category: 'Dairy', price: 5.00, producer: 'Dairy Product', contents: 'Dairy' },

]);

});

});
