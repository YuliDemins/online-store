import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from '../products/productCard';

export class HeaderInput extends BaseComponent {
  mainSearchInput: BaseComponent;

  mainSearchBtn: BaseComponent;

  constructor() {
    super({
      tag: 'form',
      className: 'main-search',
    });
    this.mainSearchInput = new BaseComponent({
      tag: 'input',
      className: 'main-search__input',
      attributes: {
        type: 'text',
        placeholder: 'Search for anything',
      },
    });

    this.mainSearchBtn = new BaseComponent({
      tag: 'button',
      className: 'main-search__btn',
    });
    this.checkBtn();
  }

  render() {
    this.addChildren(this.mainSearchInput.elem, this.mainSearchBtn.elem);
  }

  checkBtn() {
    this.mainSearchBtn.elem.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.mainSearchInput.elem instanceof HTMLInputElement) {
        this.show();
      }
    });
    this.mainSearchInput.elem.addEventListener('input', () => {
      if (this.mainSearchInput.elem instanceof HTMLInputElement) {
        this.show();
      }
    });
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    return promise;
  }

  async show() {
    const productsElem = await this.getProducts();
    const copy = [...productsElem];

    const filteredArr = copy.filter((item:IProduct) => {
      if (this.mainSearchInput.elem instanceof HTMLInputElement) {
        const arr = Object.values(item).join(' - ');
        const regex = new RegExp(this.mainSearchInput.elem.value);
        if (regex.test(arr)) {
          return item;
        } return false;
      }
    });

    const newRender = document.querySelector<HTMLElement>('.proposals__list');
    newRender!.innerHTML = '';
    filteredArr.map((item: IProduct) => {
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
