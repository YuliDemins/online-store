import { BaseComponent } from '@/services/BaseComponent';
import { ProductCardCounter } from './productCardCounter';

export class ProductCardOrder extends BaseComponent {
  private btnCardPlus;

  private Counter: ProductCardCounter;

  constructor(limit: number) {
    super({
      tag: 'div',
      className: 'proposals__list-item-order',
    });

    this.btnCardPlus = new BaseComponent({
      tag: 'button',
      className: 'proposals__list-item-card',
    });

    this.Counter = new ProductCardCounter(limit);
    this.Counter.render();
  }

  render() {
    this.addChildren(this.Counter, this.btnCardPlus);
  }

  addProduct(callback: () => void) {
    this.btnCardPlus.elem.addEventListener('click', callback);
  }
}
