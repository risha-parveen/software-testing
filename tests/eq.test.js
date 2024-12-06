// Test for adding products to the cart and checking equality using eq.js

describe('Shopping Cart - Adding Products with eq for equality check', () => {

it('should add the product to the cart and calculate the total price correctly', () => {

// User selects and adds products to the cart (for simplicity, we manually add two items)

addToCart(products[1], 2); // Adding "Dairy Milk" with quantity 2

addToCart(products[2], 1); // Adding "Dairy Cheese" with quantity 1


// Expected cart after additions

expect(cart).toEqual([

{ name: 'Dairy Milk', category: 'Dairy', price: 5.00, producer: 'Great Fields', contents: 'Almonds', quantity: 2 },

{ name: 'Dairy Cheese', category: 'Dairy', price: 8.20, producer: 'Cheese Makers', contents: 'Milk', quantity: 1 },

]);


// Calculate the total price: (2 * 5.00) + (1 * 8.20) = 10.00 + 8.20 = 18.20

expect(calculateTotal()).toBeCloseTo(18.20, 2);


// Verify that the cart contains the same product by checking equality using eq

const cartProduct = cart.find(item => eq(item.name, 'Dairy Cheese') && eq(item.producer, 'Cheese Makers'));

expect(cartProduct).toEqual({ name: 'Dairy Cheese', category: 'Dairy', price: 8.20, producer: 'Cheese Makers', contents: 'Milk', quantity: 1 });

});

});
