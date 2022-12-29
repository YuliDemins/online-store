export async function getProducts() {
  await fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((json) => {
      console.log(json.products);
      return json.products;
  });
}
