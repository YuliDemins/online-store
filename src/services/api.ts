import { IProduct } from '@/types/interfaces/product';

export const getProducts = async () => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  const list:IProduct[] = data.products;
  // console.log(list);
  return list;
};
