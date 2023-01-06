import { IProductData } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';

export class HeaderCart extends BaseComponent {
  private cartShopping: BaseComponent;

  private cartShoppingTitle: BaseComponent;

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
      textContent: 'Cart',
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
      textContent: `${this.updateCartNum()}`,
    });
  }

  render() {
    this.cartValue.addChildren(this.cartValueInner);
    this.cartShopping.addChildren(this.cartValue.elem);
    this.addChildren(this.cartShopping.elem, this.cartShoppingTitle.elem);
  }

  updateCartNum(): number {
    const arr = JSON.parse(window.localStorage.getItem('productsList') ?? '[]');
    const value = arr.reduce((p:IProductData, k:IProductData) => +p + k.amount, 0);

    if (this.cartValueInner) {
      this.cartValueInner.elem.textContent = `${value}`;
    }

    return value;
  }
}
