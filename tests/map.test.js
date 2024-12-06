import map from './map'; // Importing the map function


// Sample products and a shopping cart

const cart = [

{ name: 'Dairy Milk', category: 'Dairy', price: 5.00, producer: 'Great Fields', quantity: 2 },

{ name: 'Dairy Cheese', category: 'Dairy', price: 8.20, producer: 'Cheese Makers', quantity: 1 },

];


// Function to display cart items in a formatted way

const displayCartItems = (cart) => {

return map(cart, (item) => {

// Create a formatted string for each cart item

return `${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`;

});

};


// Test to display cart items

describe('Shopping Cart - Display Items', () => {

it('should correctly display items in the cart', () => {

const display = displayCartItems(cart);


expect(display).toEqual([

'Dairy Milk (x2) - $10.00',

'Dairy Cheese (x1) - $8.20'

]);

});

});
