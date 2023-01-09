import { ProductCard } from '@/components/products/productCard';
import { IProduct } from '@/types/interfaces/product';
import { getProducts } from './api';

export const filter = async () => {
  const productsElem = await getProducts();

  const SortRatingArr = productsElem.sort((a, b) => b.rating - a.rating);

  const filterBtn = document.querySelectorAll('input');
  // console.log(filterBtn);
  filterBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const arr = SortRatingArr.filter((el) => {
        if (e.target instanceof HTMLInputElement) {
          // console.log(el.category === e.target.value);
          return el.category === e.target.value;
        }
      });
      // console.log(arr);
    });
  });
  // const productsFilterElem:IProduct[] = [];

  // productsElem.map((item: IProduct) => {
  // if (item.category === target || item.brand === target) {
  //   productsFilterElem.push(item);
  // }

  // });

  // const price = SortRatingArr.filter((item) => item.price > 1000);

  const newRender = document.querySelector<HTMLElement>('.proposals__list');
  newRender!.innerHTML = '';
  SortRatingArr.map((item: IProduct) => {
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
// function listen(el: HTMLElement) {
  // el.addEventListener('click', (e) => {
  //   if (e.target instanceof HTMLInputElement) {
  //     const filtercategory = e.target.name;
  //     const value = e.target.value
  //     console.log(e.target.name);
  //     SortRatingArr.filter((item) => item[filtercategory] === item[value])
  //   }
  // });
// }
filter();
// listen()
