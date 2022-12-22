import {createElement} from '../../utils';

export class Header {
  header: HTMLElement;

  wrapper: HTMLElement;

  title: HTMLElement;

  root: HTMLElement | null;

  mainSearch: HTMLElement;

  mainSearchInput: HTMLElement;

  mainSearchBtn: HTMLElement;

  cart: HTMLElement;

  cartShopping: HTMLElement;

  cartShoppingTitle: HTMLElement;

  constructor() {
    this.header = createElement('header', 'header');
    this.wrapper = createElement('div', 'wrapper');
    this.title = createElement('h1', 'title', 'Store');

    this.mainSearch = createElement('form', 'main-search');
    this.mainSearchInput = createElement('input', 'main-search-input');
    this.mainSearchInput.setAttribute('type', 'text');
    this.mainSearchInput.setAttribute('placeholder', 'Поиск по товарам');
    this.mainSearchBtn = createElement('button', 'main-search-btn');
    this.mainSearch.append(this.mainSearchInput, this.mainSearchBtn);

    this.cart = createElement('div', 'cart');
    this.cartShopping = createElement('div', 'cart-shopping');
    this.cartShoppingTitle = createElement('div', 'cart-shopping-title', 'Корзина');

    this.cart.append(this.cartShopping, this.cartShoppingTitle);
    this.wrapper.append(this.title, this.mainSearch, this.cart);
    this.header.append(this.wrapper);

    this.root = document.getElementById('root');
    this.root?.append(this.header);
  }
}

// let head = new Header()
// console.log(head)
