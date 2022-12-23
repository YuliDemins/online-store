import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from './productCard';

export class ProductList extends BaseComponent {
  product1: ProductCard;

  product2: ProductCard;

  product3: ProductCard;

  listItem: BaseComponent;

  constructor() {
    super({
      tag: 'section',
      className: 'proposals',
    });

    this.listItem = new BaseComponent({
      tag: 'div',
      className: 'proposals__list',
    });

    this.product1 = new ProductCard();
    this.product1.render();

    this.product2 = new ProductCard();
    this.product2.render();

    this.product3 = new ProductCard();
    this.product3.render();
  }

  render() {
    this.listItem.addChildren(this.product1, this.product2, this.product3);
    this.addChildren(this.listItem);
  }
}
