// import { IProduct } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from '../products/productCard';
import { FilterСheckboxItem } from './filterCheckboxItem';
import { FilterRangeItem } from './filterRangeItem';

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

  categoryItem3: BaseComponent;

  title3: BaseComponent;

  categoryItem4: BaseComponent;

  title4: BaseComponent;

  filterRange1: FilterRangeItem;

  filterRange2: FilterRangeItem;

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
      textContent: 'Category',
    });

    this.categoryItem2 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title2 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Brand',
    });

    this.categoryItem3 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title3 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Price',
    });

    this.categoryItem4 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title4 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Stock',
    });

    this.filterRange1 = new FilterRangeItem();

    this.filterRange2 = new FilterRangeItem();
  }

  render() {
    this.filterRange1.render();
    this.filterRange2.render();
    this.getFiltersView('category');
    this.getFiltersView('brand');
    this.categoryItem1.addChildren(this.title1);
    this.categoryItem2.addChildren(this.title2);
    this.categoryItem3.addChildren(this.title3, this.filterRange1.elem);
    this.categoryItem4.addChildren(this.title4, this.filterRange2.elem);
    this.filterCategory.addChildren(
      this.categoryItem1.elem,
      this.categoryItem2.elem,
      this.categoryItem3.elem,
      this.categoryItem4.elem,
    );
    this.addChildren(this.filterCategory.elem);
  }

  async getFiltersView(type: 'category' | 'brand') {
    const productsElem = await this.getProducts();
    // const a = this.getFilter(productsElem, 'category');
    const forFilters = Object.keys(this.getFilter(productsElem, type));
    const filtergo:BaseComponent[] = [];
    forFilters.map((item) => {
      const elem = new FilterСheckboxItem(item);
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
      // console.log(filterPart)
      return filterPart;
    });

    interface Acc {
      [index: string]: number;
    }
    const some = filterPart.reduce((acc: Acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    return some;
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    // console.log(promise);
    return promise;
  }

  // async show() {
  //   const productsElem = await this.getProducts();
  //   const productsFilterElem:IProduct[] = [];
  //   productsElem.map((item: IProduct) => {
  //     if (item.category === 'smartphones') {
  //       productsFilterElem.push(item);
  //       return item;
  //     }
  //   });

  //   productsFilterElem.map((item) => {
  //     const elem = new ProductCard(
  //       item.id,
  //       item.title,
  //       item.rating,
  //       item.price,
  //       item.category,
  //       item.thumbnail,
  //       item.images,
  //       item.stock,
  //       item.brand,
  //       item.description,
  //       item.discountPercentage,
  //     );
  //     elem.render();
  //     return elem;
  //   });
  //   console.log(productsFilterElem);
  //   console.log(new ProductList().listItem);
  //   new ProductList().listItem.addChildren(...productsElem);
  // }
}
