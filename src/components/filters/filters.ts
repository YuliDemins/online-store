import { BaseComponent } from '@/services/BaseComponent';
import { FilterСheckboxItem } from './filterCheckboxItem';
import { FilterRangeItem } from './filterRangeItem';
import { Acc } from '../../types/interfaces/acc';
import { CheckboxTypes } from '@/types/CheckboxTypes';
import { getProducts } from '@/services/api';
import { IProduct } from '@/types/interfaces/product';

export class Filters extends BaseComponent {
  filterCategory;

  filterCheckboxBrand;

  filterCheckboxBrandTitle;

  filterRangePriceTitle: BaseComponent;

  filterRangeStock: BaseComponent;

  filterRangeStockTitle: BaseComponent;

  filterRangePrice: BaseComponent;

  filterCheckboxCategory: BaseComponent;

  filterCheckboxCategoryTitle: BaseComponent;

  filterRangePriceItem: FilterRangeItem;

  filterRangeStockItem: FilterRangeItem;

  constructor() {
    super({
      tag: 'aside',
      className: 'filter',
    });

    this.filterCategory = new BaseComponent({
      tag: 'div',
      className: 'filter-category',
    });

    this.filterCheckboxCategory = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.filterCheckboxCategoryTitle = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Category',
    });

    this.filterCheckboxBrand = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.filterCheckboxBrandTitle = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Brand',
    });

    this.filterRangePrice = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.filterRangePriceTitle = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Price',
    });

    this.filterRangeStock = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.filterRangeStockTitle = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item-title',
      textContent: 'Stock',
    });

    this.filterRangePriceItem = new FilterRangeItem('price');

    this.filterRangeStockItem = new FilterRangeItem('stock');
  }

  render() {
    this.filterRangePriceItem.render('price');
    this.filterRangeStockItem.render('stock');
    this.getFiltersView('category');
    this.getFiltersView('brand');
    this.filterCheckboxCategory.addChildren(this.filterCheckboxCategoryTitle.elem);
    this.filterCheckboxBrand.addChildren(this.filterCheckboxBrandTitle.elem);
    this.filterRangePrice.addChildren(this.filterRangePriceTitle.elem, this.filterRangePriceItem.elem);
    this.filterRangeStock.addChildren(this.filterRangeStockTitle, this.filterRangeStockItem.elem);
    this.filterCategory.addChildren(
      this.filterCheckboxCategory.elem,
      this.filterCheckboxBrand.elem,
      this.filterRangePrice.elem,
      this.filterRangeStock.elem,
    );
    this.addChildren(this.filterCategory.elem);
  }

  async getFiltersView(type: CheckboxTypes) {
    const productsElem = await getProducts();
    const forFilters = Object.keys(this.getFilter(productsElem, type));
    const filtergo:BaseComponent[] = [];
    forFilters.map((item) => {
      const elem = new FilterСheckboxItem(item, type);
      elem.render();
      filtergo.push(elem);
      return elem;
    });
    type === 'category' ?
      this.filterCheckboxCategory.addChildren(...filtergo)
      : this.filterCheckboxBrand.addChildren(...filtergo);
  }

  getFilter(arr: IProduct[], type: CheckboxTypes) {
    const filterPart: string[] = [];
    arr.map((item) => {
      filterPart.push(item[type]);
      return filterPart;
    });

    const some = filterPart.reduce((acc: Acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    return some;
  }
}
