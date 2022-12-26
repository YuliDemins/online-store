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

  cartValue: BaseComponent;

  cartValueInner: BaseComponent;

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

    this.cart = new BaseComponent({
      tag: 'div',
      className: 'cart',
    });

    this.cartShopping = new BaseComponent({
      tag: 'a',
      className: 'cart__shopping',
    });

    this.cartShoppingTitle = new BaseComponent({
      tag: 'a',
      className: 'cart__title',
      textContent: 'Корзина',
      attributes: {
        href: '#cart',
      },
    });

    this.cartValue = new BaseComponent({
      tag: 'div',
      className: 'cart__value',
    });

    this.cartValueInner = new BaseComponent({
      tag: 'div',
      textContent: '2',
    });
  }

  render() {
    this.cartValue.addChildren(this.cartValueInner);
    this.cartShopping.addChildren(this.cartValue.elem);
    this.cart.addChildren(this.cartShopping.elem, this.cartShoppingTitle.elem);
    this.mainSearch.addChildren(this.mainSearchInput.elem, this.mainSearchBtn.elem);
    this.wrapper.addChildren(this.title.elem, this.mainSearch.elem, this.cart.elem);
    this.addChildren(this.wrapper.elem);
  }
}
