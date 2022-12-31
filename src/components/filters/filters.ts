import { IProduct } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from '../products/productCard';
import { FiltersItem } from './filterItem';

export class Filters extends BaseComponent {
  categoryItem1;

  title1;

  filterCategory;

  categoryItem2;

  title2;

  filterItem1!: BaseComponent | HTMLElement;

  form!: BaseComponent;

  input!: BaseComponent;

  span!: BaseComponent;

  constructor() {
    super({
      tag: 'aside',
      className: 'filter',
    });

    this.filterCategory = new BaseComponent({
      tag: 'div',
      className: 'filter-category',
    });

    this.categoryItem1 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title1 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Категория',
    });

    this.categoryItem2 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title2 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Бренд',
    });
  }

  render() {
    this.getFiltersView('category');
    this.getFiltersView('brand');
    this.categoryItem1.addChildren(this.title1);
    this.categoryItem2.addChildren(this.title2);
    this.filterCategory.addChildren(this.categoryItem1.elem, this.categoryItem2.elem);
    this.addChildren(this.filterCategory.elem);
  }

  async getFiltersView(type: 'category' | 'brand') {
    const productsElem = await this.getProducts();
    // const a = this.getFilter(productsElem, 'category');
    const forFilters = Object.keys(this.getFilter(productsElem, type));
    const filtergo:BaseComponent[] = [];
    forFilters.map((item) => {
      const elem = new FiltersItem(item);
      elem.render();
      filtergo.push(elem);
      return elem;
    });
    type === 'category' ? this.categoryItem1.addChildren(...filtergo) : this.categoryItem2.addChildren(...filtergo);
  }

  getFilter(arr: ProductCard[], type: 'category' | 'brand') {
    const filterPart: string[] = [];
    arr.map((item) => {
      filterPart.push(item[type]);
      return filterPart;
    });
    const some = filterPart.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    console.log(some);
    return some;
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    // console.log(promise);
    return promise;
  }

  async show() {
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
      );
      elem.render();
      return elem;
    });
    console.log(productsElem);
  }
}
