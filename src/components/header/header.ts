<<<<<<< HEAD
// import { root } from "../../index";
=======
>>>>>>> develop
import { BaseComponent } from '@/services/BaseComponent';

export class Header extends BaseComponent {
  private wrapper;

  private title;
<<<<<<< HEAD
=======

  private mainSearch;

  private mainSearchBtn;

  private mainSearchInput;

  private cart;

  private cartShopping;

  private cartShoppingTitle;
>>>>>>> develop

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
<<<<<<< HEAD
      className: 'title',
      textContent: 'Store',
    });
  }

  render() {
    this.wrapper.addChildren(this.title.elem);
=======
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
    this.cart.addChildren(this.cartShopping.elem, this.cartShoppingTitle.elem);
    this.mainSearch.addChildren(this.mainSearchInput.elem, this.mainSearchBtn.elem);
    this.wrapper.addChildren(this.title.elem, this.mainSearch.elem, this.cart.elem);
>>>>>>> develop
    this.addChildren(this.wrapper.elem);
  }
}
