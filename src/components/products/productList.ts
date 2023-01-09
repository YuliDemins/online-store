import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from './productCard';
import { Sort } from '../sort/sort';
import { getProducts } from '@/services/api';

export class ProductList extends BaseComponent {
  listItem: BaseComponent;

  sort: Sort;

  sort: Sort;

  constructor() {
    super({
      tag: 'section',
      className: 'proposals',
    });

    this.listItem = new BaseComponent({
      tag: 'div',
      className: 'proposals__list',
    });

    this.sort = new Sort();
    this.sort.render();

    this.sort = new Sort();
    this.sort.render();
  }

  async render() {
    const productsElem = await getProducts();
    const productsEl = productsElem.map((item: IProduct) => {
      const elem = new ProductCard(
        item.id,
        item.title,
        item.rating,
        item.price,
        item.category,
        item.thumbnail,
        item.images,
        item.stock,
        item.brand,
        item.description,
        item.discountPercentage,
      );
      elem.render();
      return elem;
    });

    this.listItem.addChildren(...productsEl);
    this.addChildren(this.sort.elem, this.listItem);
  }
}
