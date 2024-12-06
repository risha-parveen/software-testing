import get from './get';  // Importing the get function

// Sample products
const products = [
  { name: 'Organic Blueberries', category: 'Organic', price: 10.00, producer: 'Berries Farms' },
  { name: 'Dairy Milk', category: 'Dairy', price: 5.00, producer: 'Great Fields' },
  { name: 'Dairy Cheese', category: 'Dairy', price: 8.20, producer: 'Cheese Makers' },
];

// Filter function using get
const filterByCategoryAndPrice = (product) => 
  get(product, 'category') === 'Dairy' && get(product, 'price') > 5.00;

const filteredProducts = products.filter(filterByCategoryAndPrice);

console.log(filteredProducts);
