import { IProduct } from '@/interfaces/product';
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
        placeholder: 'Поиск по товарам',
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
        console.log(this.mainSearchInput.elem.value);
        this.show();
      }
    });
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    // console.log(promise);
    return promise;
  }

  async show() {
    const productsElem = await this.getProducts();
    const productsFilterElem:ProductCard[] = [];
    const copy = [...productsElem];
    copy.map((item: ProductCard) => {
      const arr = Object.values(item).map((el) => {
        delete el.images;
        delete el.thumbnail;
        return el.toString().toLowerCase();
      });

      if (this.mainSearchInput.elem instanceof HTMLInputElement) {
        if (arr.includes(this.mainSearchInput.elem.value)) {
          productsFilterElem.push(item);
        }
      }
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
