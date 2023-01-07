import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from './productCard';

export class ProductList extends BaseComponent {
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
  }

  async render() {
    let productsElem = await this.getProducts();
    productsElem = productsElem.map((item: IProduct) => {
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

    this.listItem.addChildren(...productsElem);
    this.addChildren(this.listItem);
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    // console.log(promise);
    return promise;
  }
}
