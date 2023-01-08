import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from '../products/productCard';

export class FilterСheckboxItem extends BaseComponent {
  span: BaseComponent;

  input:BaseComponent;

  constructor(elem: string) {
    super({
      tag: 'label',
      className: 'filter-category-form',
      textContent: elem,
    });

    this.input = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        name: 'brand',
        value: elem,
      },
    });

    this.span = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.checkBtn();
  }

  render() {
    this.addChildren(this.input.elem, this.span.elem);
  }

  checkBtn() {
    this.input.elem.addEventListener('click', () => {
      // console.log(this.input.elem.value);
      if (this.input.elem instanceof HTMLInputElement) {
        if (this.input.elem.hasAttribute('checked')) {
          this.input.elem.removeAttribute('checked');
          this.show();
        } else {
          this.input.elem.setAttribute('checked', 'true');
          this.show(this.input.elem.value);
        }
      }
    });
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    console.log(promise);
    return promise;
  }

  async show(target = '') {
    const productsElem = await this.getProducts();
    const productsFilterElem:IProduct[] = [];
    productsElem.map((item: IProduct) => {
      if (item.category === target || item.brand === target) {
        productsFilterElem.push(item);
      }
      if (target === '') productsFilterElem.push(item);
      return productsFilterElem;
    });

    const newRender = document.querySelector<HTMLElement>('.proposals__list');
    newRender!.innerHTML = '';
    console.log(productsFilterElem);
    productsFilterElem.map((item: IProduct) => {
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
}
