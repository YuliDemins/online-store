import {createElement} from '../../utils';
import {getProducts} from '../products';

export interface Product {
  id: string,
  title: string,
  brand: string,
  category: string,
  description: string,
  discountPercentage: string,
  price: string,
  rating: string,
  stock: string,
  thumbnail: string,
  images:string[],
}

export class MainPage {
  main: HTMLElement;

  wrapper: HTMLElement;

  root: HTMLElement | null;

  filter: HTMLElement;

  filterCategory: HTMLElement;

  filterCategoryItem: HTMLElement;

  filterCategoryItemTitle: HTMLElement;

  filterCategoryForm: HTMLElement;

  filterCategoryInput: HTMLElement;

  filterCategorySpan: HTMLElement;

  filterCategoryForm1: HTMLElement;

  filterCategoryInput1: HTMLElement;

  filterCategorySpan1: HTMLElement;

  filterCategoryInput2: HTMLElement;

  filterCategorySpan2: HTMLElement;

  filterCategoryForm2: HTMLElement;

  // products: void;

  // products: void;

  constructor() {
    this.main = createElement('main', 'main');
    this.wrapper = createElement('div', 'wrapper');
    this.filter = createElement('aside', 'filter');
    this.filterCategory = createElement('div', 'filter-category');

    this.filterCategoryItem = createElement('div', 'filter-category-item');
    this.filterCategoryItemTitle = createElement('h3', 'filter-category-item-title', 'Категория');

    this.filterCategoryForm = createElement('label', 'filter-category-form', 'Зеленый');
    this.filterCategoryInput = createElement('input', 'filter-category-input');
    this.filterCategoryInput.setAttribute('name', 'color');
    this.filterCategoryInput.setAttribute('value', 'green');
    this.filterCategorySpan = createElement('span', 'filter-category-span');
    this.filterCategoryForm.append(this.filterCategoryInput, this.filterCategorySpan);
    this.filterCategoryItem.append(this.filterCategoryItemTitle, this.filterCategoryForm);
    this.filterCategory.append(this.filterCategoryItem);

    this.filterCategoryForm1 = createElement('label', 'filter-category-form', 'Черный');
    this.filterCategoryInput1 = createElement('input', 'filter-category-input');
    this.filterCategoryInput1.setAttribute('name', 'color');
    this.filterCategoryInput1.setAttribute('value', 'black');
    this.filterCategorySpan1 = createElement('span', 'filter-category-span');
    this.filterCategoryForm1.append(this.filterCategoryInput1, this.filterCategorySpan1);

    this.filterCategoryForm2 = createElement('label', 'filter-category-form', 'Белый');
    this.filterCategoryInput2 = createElement('input', 'filter-category-input');
    this.filterCategoryInput2.setAttribute('name', 'color');
    this.filterCategoryInput2.setAttribute('value', 'white');
    this.filterCategorySpan2 = createElement('span', 'filter-category-span');
    this.filterCategoryForm2.append(this.filterCategoryInput2, this.filterCategorySpan2);

    this.filterCategoryItem.append(this.filterCategoryForm, this.filterCategoryForm1, this.filterCategoryForm2);

    this.filterCategory.append(this.filterCategoryItem);

    this.filter.append(this.filterCategory);

    this.wrapper.append(this.filter);

    this.main.append(this.wrapper);

    this.root = document.getElementById('root');
    this.root?.append(this.main);

    // this.products = getProducts();
  }

  // async getProducts() {
  //   const res:Response = await fetch('https://dummyjson.com/products/');
  //   const json = await res.json();
  //   try {
  //     // console.log(json.products);
  //     return await json.products;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
