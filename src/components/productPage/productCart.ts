import { BaseComponent } from '@/services/BaseComponent';

export class ProductPageCart extends BaseComponent {
  cartSectionPrice: BaseComponent;

  cartSectionAddBtn: BaseComponent;

  cartSectionBuyBtn: BaseComponent;

  constructor() {
    super({
      className: 'product-page__cart',
    });

    this.cartSectionPrice = new BaseComponent({
      tag: 'p',
      className: 'product-page__cart-price',
      textContent: 'price',
    });

    this.cartSectionAddBtn = new BaseComponent({
      tag: 'button',
      className: 'product-page__cart-add-btn',
      textContent: 'ADD TO CART',
    });

    this.cartSectionBuyBtn = new BaseComponent({
      tag: 'button',
      className: 'product-page__cart-buy-btn',
      textContent: 'BUY NOW',
    });
  }

  render() {
    this.addChildren(this.cartSectionPrice, this.cartSectionAddBtn, this.cartSectionBuyBtn);
  }
}
