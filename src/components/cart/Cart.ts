import { app } from '@/index';
import { IProductData } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { Order } from './order';
import { Total } from './total';

export class Cart extends BaseComponent {
  title: BaseComponent;

  prev: BaseComponent;

  wrapper: BaseComponent;

  shopping: BaseComponent;

  orders: Order[];

  total: Total;

  constructor() {
    super({
      tag: 'div',
      className: 'cart-buy',
    });

    this.prev = new BaseComponent({
      tag: 'a',
      className: 'prev',
      textContent: 'Back to shopping',
      attributes: {
        href: '#main',
      },
    });

    this.title = new BaseComponent({
      tag: 'h3',
      className: 'shopping-title',
      textContent: 'Cart',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'wrapper-cart',
    });

    this.shopping = new BaseComponent({
      tag: 'div',
      className: 'shopping',
    });

    this.orders = JSON.parse(window.localStorage.getItem('productsList') ?? '[]')
      .map((item: IProductData, index: number) => {
        const elem = new Order(
          item.title,
          item.thumbnail,
          item.description,
          item.stock,
          item.price,
          item.amount,
          item.id,
          this.updateOnCount.bind(this),
          index + 1,
        );
        elem.render();
        return elem;
      });

    this.total = new Total();
    this.total.render();
  }

  render() {
    this.shopping.addChildren(...this.orders);
    this.wrapper.addChildren(this.shopping.elem, this.total);
    this.addChildren(this.prev.elem, this.title.elem, this.wrapper.elem);
  }

  updateOnCount() {
    const arr = JSON.parse(window.localStorage.getItem('productsList') ?? '[]');
    const totalPrice = `${this.total.calcTotalPrice(arr)}$`;
    const totalAmount = `${this.total.calcTotalAmount(arr)}`;

    this.total.totalPrice.elem.textContent = totalPrice;
    this.total.updateDiscountTitle();
    this.total.totalCount.elem.textContent = `${totalAmount} items`;

    app.header.Cart.updateCartNum();
    app.header.updateTotal();
  }
}
