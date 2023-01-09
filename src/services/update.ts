import { ProductCard } from '@/components/products/productCard';
import { IProduct } from '@/types/interfaces/product';
import { getProducts } from './api';

export const press = (el: HTMLElement) => {
  el.addEventListener('input', (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.type === 'checkbox') {
      if (el.hasAttribute('checked')) {
        el.removeAttribute('checked');
        update(e);
      } else {
        el.setAttribute('checked', 'true');
        console.log(target.value);
        update(e);
      }
    }
    if (target.type === 'text') filtered(e);
  });
};

export async function filtered(e: Event) {
  const productsElem = await getProducts();
  const copy = [...productsElem];
  const filteredArr = copy.filter((item:IProduct) => {
    const target = e.target as HTMLInputElement;
    const arr = Object.values(item).join(' - ');
    const regex = new RegExp(target.value, 'i');
    return regex.test(arr);
  });
  show(filteredArr);
  return filteredArr;
}

async function update(e: Event) {
  const filteredArr = filtered(e);
  show(await filteredArr);

  const filterType = document.getElementsByTagName('input');
  const target = e.target as HTMLInputElement;
  [...filterType].forEach(async (inp) => {
    if (inp.type === 'checkbox') {
      if (inp.hasAttribute('checked')) {
        if (inp.name !== target.name) {
          const filteredArr1 = (await filteredArr).filter((item:IProduct) => {
            const arr = Object.values(item).join(',');
            const regex = new RegExp(inp.value, 'i');
            return regex.test(arr);
          });
          show(filteredArr1);
        }
      }
    }
  });
}

export function show(arr: IProduct[]) {
  const newRender = document.querySelector<HTMLElement>('.proposals__list');
  newRender!.innerHTML = '';
  arr.map((item: IProduct) => {
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
}
