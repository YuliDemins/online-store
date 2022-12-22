// import {createElement} from '../../utils';

import { BaseComponent } from '@/services/BaseComponent';

export class Header extends BaseComponent {
  private wrapper;

  private title;

  private mainSearch;

  private mainSearchBtn;

  private mainSearchInput;

  cart: BaseComponent;

  cartShopping: BaseComponent;

  cartShoppingTitle: BaseComponent;

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
