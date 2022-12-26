import { BaseComponent } from '@/services/BaseComponent';
import { Order } from './order';

export class Cart extends BaseComponent {
  item1;

  title;

  prev: BaseComponent;

  wrapper: BaseComponent;

  shopping: BaseComponent;

  item2;

  constructor() {
    super({
      tag: 'div',
      className: 'cart-buy',
    });

    this.prev = new BaseComponent({
      tag: 'div',
      className: 'prev',
      textContent: 'Вернуться к покупкам',
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

    this.item1 = new Order();
    this.item1.render();

    this.item2 = new Order();
    this.item2.render();
  }

  render() {
    this.shopping.addChildren(this.item1, this.item2);
    this.wrapper.addChildren(this.shopping.elem);
    this.addChildren(this.prev.elem, this.title.elem, this.wrapper.elem);
  }
}
