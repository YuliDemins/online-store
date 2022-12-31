import { BaseComponent } from '@/services/BaseComponent';
import { ProductCardCounter } from './productCardCounter';

export class ProductCardOrder extends BaseComponent {
  private btnCardPlus;

  private Counter: ProductCardCounter;

  constructor() {
    super({
      tag: 'div',
      className: 'proposals__list-item-order',
    });

    this.btnCardPlus = new BaseComponent({
      tag: 'button',
      className: 'proposals__list-item-card',
    });

    this.Counter = new ProductCardCounter();
    this.Counter.render();
  }

  render() {
    this.addChildren(this.Counter, this.btnCardPlus);
  }
}
