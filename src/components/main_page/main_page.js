// @ts-nocheck
import { addFilters, createElement } from '../../utils';
// import {getProducts} from '../products';

export class MainPage {
  constructor() {
    this.main = createElement('main', 'main');
    this.wrapper = createElement('div', 'wrapper');
    this.filter = createElement('aside', 'filter');
    this.filterCategory = createElement('div', 'filter-category');

    this.filterCategoryItem = createElement('div', 'filter-category-item');

    const category = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'];

    // category.map((item) => {
    //   this.filterCategoryForm = createElement('label', 'filter-category-form', item);
    //   this.filterCategoryInput = createElement('input', 'filter-category-input');
    //   this.filterCategoryInput.setAttribute('type', 'checkbox');
    //   this.filterCategoryInput.setAttribute('name', 'category');
    //   this.filterCategoryInput.setAttribute('value', item);
    //   this.filterCategorySpan = createElement('span', 'filter-category-span');
    //   this.filterCategoryForm.append(this.filterCategoryInput, this.filterCategorySpan);
    //   this.filterCategoryItem.append(this.filterCategoryForm);
    //   this.filterCategory.append(this.filterCategoryItem);
    //   return item;
    // });

    const brand = ['Apple', 'Samsung', 'OPPO', 'Huawei', 'Microsoft Surface', 'Infinix', 'HP Pavilion'];
    const filter = [
      category, brand,
    ];

    filter.map((item) => this.addFilters(item));
    // addFilters(category);
    // addFilters(brand);
    // console.log(this.addFilters(brand));

    // this.filterCategoryItem.append(this.filterCategoryForm);
    // this.filterCategory.append(this.filterCategoryItem);

    this.filterCategory.append(this.filterCategoryItem);

    this.filter.append(this.filterCategory);

    this.wrapper.append(this.filter);
    this.main.append(this.wrapper);
    this.root = document.getElementById('root');
    // @ts-ignore
    this.root.append(this.main);
    // const products = getProducts();
    // products.then((data) => data);

    // console.log(products);
  }

  // addFilters(filters) {
  //   filters.map((item) => {
  //     this.filterCategoryItemTitle = createElement('h3', 'filter-category-item-title', filters);
  //     this.filterCategoryItem.append(this.filterCategoryItemTitle);
  //     this.filterCategoryForm = createElement('label', 'filter-category-form', item);
  //     this.filterCategoryInput = createElement('input', 'filter-category-input');
  //     this.filterCategoryInput.setAttribute('type', 'checkbox');
  //     this.filterCategoryInput.setAttribute('name', 'category');
  //     this.filterCategoryInput.setAttribute('value', item);
  //     this.filterCategorySpan = createElement('span', 'filter-category-span');
  //     this.filterCategoryForm.append(this.filterCategoryInput, this.filterCategorySpan);
  //     this.filterCategoryItem.append(this.filterCategoryForm);
  //     this.filterCategory.append(this.filterCategoryItem);
  //     return item;
  //   });
  // }
}
