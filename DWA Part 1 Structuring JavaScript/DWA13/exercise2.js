const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ]

//Use forEach to console.log each product name to the console.

products.forEach(item => console.log(item.product));

//Use filter to filter out products that have a name longer than 5 characters

const filterProducts = products.filter(item => item.product.length <= 5);

console.log(filterProducts);

//Using both filter and map. Convert all prices that are strings to numbers, and remove all products from the
//array that do not have prices. After this has been done then use reduce to calculate the combined price of 
//all remaining products.

const filteredProducts = products
    .map(item => ({
        ...item,
        price: parseFloat(item.price) || item.price
    }))
    .filter(item => typeof item.price === 'number' && !isNaN(item.price));

const combinedPrice = filteredProducts.reduce((total, item) => total + item.price, 0);

console.log(filteredProducts);
console.log(`Combined Price: ${combinedPrice}`);

//Use reduce to concatenate all product names to create the following 
//string: banana, mango, potato, avocado, coffee and tea.

const concatenatedNames = products
    .map(item => item.product)
    .reduce((acc, name, index, array) => {
        if (index === 0) {
            return name;
        } else if (index === array.length - 1) {
            return `${acc} and ${name}`;
        } else {
            return `${acc}, ${name}`;
        }
    }, '');

console.log(concatenatedNames);

//Use reduce to calculate both the highest and lowest-priced items. The names should be returned as 
//the following string: Highest: coffee. Lowest: banana.

const result = products.reduce((acc, item) => {
    const price = parseFloat(item.price);
  
    if (!isNaN(price)) {
      if (acc.highest === null || price > acc.highest.price) {
        acc.highest = { product: item.product, price: price };
      }
      if (acc.lowest === null || price < acc.lowest.price) {
        acc.lowest = { product: item.product, price: price };
      }
    }
  
    return acc;
  }, { highest: null, lowest: null });
  
  const resultString = `Highest: ${result.highest.product}. Lowest: ${result.lowest.product}.`;
  
  console.log(resultString);

//Using only Object.entries and reduce recreate the object with the exact same values. However, 
//the following object keys should be changed in the new array:
// product should be changed to name
// price should be changed to cost

const updatedProducts = products.reduce((acc, product) => {
    const newProduct = Object.entries(product).reduce((newObj, [key, value]) => {
        if (key === 'product') {
            newObj['name'] = value;
        } else if (key === 'price') {
            newObj['cost'] = value;
        }
        return newObj;
    }, {});
    acc.push(newProduct);
    return acc;
}, []);

console.log(updatedProducts);