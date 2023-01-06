import { IProductData } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { HeaderCart } from './HeaderCart';
import { HeaderInput } from './headerInput';

export class Header extends BaseComponent {
  private wrapper;

  private title;

  private mainSearch;

  private mainSearchBtn;

  private mainSearchInput;

  public Cart: HeaderCart;

  public totalSum;

  input: HeaderInput;

  constructor() {
    super({
      tag: 'header',
      className: 'header',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'header__wrapper',
    });

    this.title = new BaseComponent({
      tag: 'h1',
      className: 'header__title',
      textContent: 'Store',
    });

    this.mainSearch = new BaseComponent({
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

    this.input = new HeaderInput();
    this.input.render();

    this.totalSum = new BaseComponent({
      tag: 'div',
      className: 'header__total-sum',
      textContent: `${this.updateTotal()}$`,
    });

    this.Cart = new HeaderCart();
    this.Cart.render();
  }

  render() {
    this.mainSearch.addChildren(this.mainSearchInput.elem, this.mainSearchBtn.elem);
    this.wrapper.addChildren(this.title.elem, this.mainSearch.elem, this.totalSum.elem, this.Cart.elem);

    this.addChildren(this.wrapper.elem);
  }

  updateTotal() {
    const arr = JSON.parse(window.localStorage.getItem('productsList') ?? '[]');
    const value = arr.reduce((p: number, k: IProductData) => +p + (+k.price * +k.amount), 0);

    if (this.totalSum) {
      this.totalSum.elem.textContent = `${+value}$`;
    }

    return value;
  }
}
