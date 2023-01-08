import { ProductCard } from '@/components/products/productCard';
import { IProduct } from '@/types/interfaces/product';
import { getProducts } from './api';

export const filter = async () => {
  const productsElem = await getProducts();

  const productsFilterElem:IProduct[] = []
  
  productsElem.map((item: IProduct) => {
    if (item.category === target || item.brand === target) {
      productsFilterElem.push(item);
    }
  })


  const newRender = document.querySelector<HTMLElement>('.proposals__list');
  newRender!.innerHTML = '';
  productsElem.map((item: IProduct) => {
    const elem = new ProductCard(
      item.id,
      item.title,
      item.rating,
      item.price,
      item.category,
      item.thumbnail,
      item.images,
      item.stock,
      item.brand,
      item.description,
      item.discountPercentage,
    );
    elem.render();
    newRender?.appendChild(elem.elem);
    return elem.elem;
  });
};
