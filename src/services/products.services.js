import axios from 'axios';

async function pushProductToAPI(productObject) {
  await axios
    .post('https://fakestoreapi.com/products', productObject)
    .then(res => {
      console.log(res);
    });
}

async function getProductsFromAPI() {
  const response = await fetch('https://fakestoreapi.com/products');
  return response;
}

export {pushProductToAPI, getProductsFromAPI};
