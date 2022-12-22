// import {createElement} from '../../utils';

import { BaseComponent } from '@/services/BaseComponent';

export class Header extends BaseComponent {
  private wrapper;

  private title;

  // mainSearch: HTMLElement;

  // mainSearchInput: HTMLElement;

  // mainSearchBtn: HTMLElement;

  // cart: HTMLElement;

  // cartShopping: HTMLElement;

  // cartShoppingTitle: HTMLElement;

  constructor() {

    // this.header = createElement('header', 'header');
    // this.wrapper = createElement('div', 'wrapper');
    // this.title = createElement('h1', 'title', 'Store');

    // this.mainSearch = createElement('form', 'main-search');
    // this.mainSearchInput = createElement('input', 'main-search-input');
    // this.mainSearchInput.setAttribute('type', 'text');
    // this.mainSearchInput.setAttribute('placeholder', 'Поиск по товарам');
    // this.mainSearchBtn = createElement('button', 'main-search-btn');
    // this.mainSearch.append(this.mainSearchInput, this.mainSearchBtn);

    // this.cart = createElement('div', 'cart');
    // this.cartShopping = createElement('div', 'cart-shopping');
    // this.cartShoppingTitle = createElement('div', 'cart-shopping-title', 'Корзина');

    // this.cart.append(this.cartShopping, this.cartShoppingTitle);
    // this.wrapper.append(this.title, this.mainSearch, this.cart);
    // this.header.append(this.wrapper);

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
      className: 'title',
      textContent: 'Store',
    });
  }

  render() {
    this.wrapper.addChildren(this.title.elem);
    this.addChildren(this.wrapper.elem);
  }
}