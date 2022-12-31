import { IProductData } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { Order } from './order';
import { Total } from './total';

export class Cart extends BaseComponent {
  title;

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
      textContent: 'Вернуться к покупкам',
      attributes: {
        href: '#main',
      },
    });

    this.title = new BaseComponent({
      tag: 'h3',
      className: 'shopping-title',
      textContent: 'Корзина',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'wrapper-cart',
    });

    this.shopping = new BaseComponent({
      tag: 'div',
      className: 'shopping',
    });

    this.orders = JSON.parse(window.localStorage.getItem('productsList') ?? '[]').map((item: IProductData) => {
      const elem = new Order(item.title, item.thumbnail, item.description, item.stock, item.price, item.amount);
      elem.render();
      return elem;
    });
    console.log(this.orders);

    this.total = new Total();
    this.total.render();
  }

  render() {
    this.shopping.addChildren(...this.orders);
    this.wrapper.addChildren(this.shopping.elem, this.total);
    this.addChildren(this.prev.elem, this.title.elem, this.wrapper.elem);
  }
}
