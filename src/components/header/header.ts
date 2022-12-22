import { BaseComponent } from '@/services/BaseComponent';

export class Header extends BaseComponent {
  private wrapper;

  private title;

  private mainSearch;

  private mainSearchBtn;

  private mainSearchInput;

  private cart;

  private cartShopping;

  private cartShoppingTitle;

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
      attrName: 'type',
      attrValue: 'text',
      // attrName: 'placeholder',
      // attrValue: 'Поиск по товарам',
    });

    this.mainSearchBtn = new BaseComponent({
      tag: 'button',
      className: 'main-search__btn',
    });

    this.cart = new BaseComponent({
      tag: 'div',
      className: 'cart',
    });

    this.cartShopping = new BaseComponent({
      tag: 'div',
      className: 'cart__shopping',
    });

    this.cartShoppingTitle = new BaseComponent({
      tag: 'div',
      className: 'cart__title',
      textContent: 'Корзина',
    });
  }

  render() {
    this.cart.addChildren(this.cartShopping, this.cartShoppingTitle);
    this.mainSearch.addChildren(this.mainSearchInput, this.mainSearchBtn);
    this.wrapper.addChildren(this.title.elem, this.mainSearch, this.cart);
    this.addChildren(this.wrapper.elem);
  }
}
