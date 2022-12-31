import { BaseComponent } from '@/services/BaseComponent';

export class HeaderCart extends BaseComponent {
  private cartShopping;

  private cartShoppingTitle;

  cartValue: BaseComponent;

  cartValueInner: BaseComponent;

  constructor() {
    super({
      tag: 'div',
      className: 'cart',
    });

    this.cartShopping = new BaseComponent({
      tag: 'a',
      className: 'cart__shopping',
      attributes: {
        href: '#cart',
      },
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
      textContent: `${JSON.parse(window.localStorage.getItem('productsList') ?? '[]').length}`,
    });
  }

  render() {
    this.cartValue.addChildren(this.cartValueInner);
    this.cartShopping.addChildren(this.cartValue.elem);
    this.addChildren(this.cartShopping.elem, this.cartShoppingTitle.elem);
  }

  updateCartNum() {
    this.cartValueInner.elem.textContent = `${JSON.parse(window.localStorage.getItem('productsList') ?? '[]').length}`;
  }
}
