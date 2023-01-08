import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCard } from '../products/productCard';
import { RangeTypes } from '@/types/RangeTypes';

export class FilterRangeItem extends BaseComponent {
  wrapper: BaseComponent;

  controls: BaseComponent;

  labelRange1: BaseComponent;

  inputRange1: BaseComponent;

  labelRange2: BaseComponent;

  inputRange2: BaseComponent;

  line: BaseComponent;

  progress: BaseComponent;

  span: BaseComponent;

  labelNum1: BaseComponent;

  inputNum1: BaseComponent;

  labelNum2: BaseComponent;

  inputNum2: BaseComponent;

  constructor(type: RangeTypes) {
    super({
      tag: 'div',
      className: ['filter-category-item__range', 'range'],
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'range__wrapper',
    });

    this.labelNum1 = new BaseComponent({
      tag: 'label',
      className: 'range__label',
      // textContent: '$',
    });
    this.inputNum1 = new BaseComponent({
      tag: 'input',
      className: 'range__input',
      attributes: {
        type: 'number',
        placeholder: '0',
      },
    });

    this.span = new BaseComponent({
      tag: 'span',
      textContent: '-',
    });

    this.labelNum2 = new BaseComponent({
      tag: 'label',
      className: 'range__label',
      // textContent: '$',
    });
    this.inputNum2 = new BaseComponent({
      tag: 'input',
      className: 'range__input',
      attributes: {
        type: 'number',
        placeholder: '2000',
      },
    });

    this.line = new BaseComponent({
      tag: 'div',
      className: 'range__line',
    });
    this.progress = new BaseComponent({
      tag: 'div',
      className: 'range__progress',
    });

    this.controls = new BaseComponent({
      tag: 'div',
      className: 'range__controls',
    });
    this.labelRange1 = new BaseComponent({
      tag: 'label',
      className: ['range__label', 'range__label_range'],
    });
    this.inputRange1 = new BaseComponent({
      tag: 'input',
      className: ['range__input', 'range__input_range'],
      attributes: {
        type: 'range',
        step: '1',
        min: '0',
        max: '2000',
        value: '0',
      },
    });
    this.labelRange2 = new BaseComponent({
      tag: 'label',
      className: ['range__label', 'range__label_range'],
    });
    this.inputRange2 = new BaseComponent({
      tag: 'input',
      className: ['range__input', 'range__input_range'],
      attributes: {
        type: 'range',
        step: '1',
        min: '0',
        max: '2000',
        value: '2000',
      },
    });
    this.change(type);
  }

  render(type:RangeTypes) {
    this.line.addChildren(this.progress.elem);
    this.labelRange1.addChildren(this.inputRange1.elem);
    this.labelRange2.addChildren(this.inputRange2.elem);
    this.controls.addChildren(this.labelRange1.elem, this.labelRange2.elem);
    this.labelNum1.addChildren(this.inputNum1);
    this.labelNum2.addChildren(this.inputNum2.elem);
    this.wrapper.addChildren(this.labelNum1.elem, this.span.elem, this.labelNum2.elem);
    this.addChildren(this.wrapper.elem, this.line.elem, this.controls);
    // this.change(type);
    this.getFiltersView(type);
  }

  change(type: RangeTypes) {
    this.inputRange1.elem.addEventListener('input', () => {
      if (this.inputRange1.elem instanceof HTMLInputElement &&
        this.inputNum1.elem instanceof HTMLInputElement) {
        console.log(this.inputNum1.elem.value);
        this.progress.elem.style.left = `${(Number(this.inputRange1.elem.value) * 100)
          / Number(this.inputRange1.elem.max)}%`;
        this.inputNum1.elem.value = this.inputRange1.elem.value;
      }
    });

    this.inputRange1.elem.addEventListener('mouseup', () => {
      this.show(type);
    });

    this.inputRange2.elem.addEventListener('input', () => {
      if (this.inputRange2.elem instanceof HTMLInputElement && this.inputNum2.elem instanceof HTMLInputElement) {
        this.progress.elem.style.right = `${100 - (Number(this.inputRange2.elem.value) * 100) /
        Number(this.inputRange2.elem.max)}%`;
        this.inputNum2.elem.value = this.inputRange2.elem.value;
      }
    });

    this.inputRange2.elem.addEventListener('mouseup', () => {
    });
  }

  async getProducts() {
    const promise = await fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => json.products);
    return promise;
  }

  async show(target: RangeTypes) {
    const productsElem = await this.getProducts();
    const productsFilterElem:IProduct[] = [];
    productsElem.map((item: IProduct) => {
      if (this.inputRange1.elem instanceof HTMLInputElement && this.inputRange2.elem instanceof HTMLInputElement) {
        if (item[target] >= Number(this.inputRange1.elem.value)
        && item[target] <= Number(this.inputRange2.elem.value)) {
          productsFilterElem.push(item);
        }
      }
      return productsFilterElem;
    });

    const newRender = document.querySelector<HTMLElement>('.proposals__list');
    newRender!.innerHTML = '';
    console.log(productsFilterElem);
    productsFilterElem.map((item: IProduct) => {
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
      newRender?.appendChild(elem.elem);
      return elem.elem;
    });
  }

  async getFiltersView(type: RangeTypes) {
    const productsElem = await this.getProducts();
    const a = this.getFilter(productsElem, type);
    console.log(a);
    const forFilters = a.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    if (this.inputRange1.elem instanceof HTMLInputElement &&
      this.inputRange2.elem instanceof HTMLInputElement &&
      this.inputNum1.elem instanceof HTMLInputElement &&
      this.inputNum2.elem instanceof HTMLInputElement) {
      this.inputNum1.elem.placeholder = forFilters.slice(0, 1).join('');
      this.inputRange1.elem.min = forFilters.slice(0, 1).join('');
      this.inputRange1.elem.max = forFilters.slice(-1).join('');
      this.inputRange2.elem.min = forFilters.slice(0, 1).join('');
      this.inputNum2.elem.placeholder = forFilters.slice(-1).join('');
      this.inputRange2.elem.max = forFilters.slice(-1).join('');
      this.inputRange2.elem.value = forFilters.slice(-1).join('');
    }
  }

  getFilter(arr: ProductCard[], type: RangeTypes) {
    const filterPart: string[] = [];
    arr.map((item) => {
      filterPart.push(item[type].toString());
      // console.log(filterPart);
      return filterPart;
    });
    return filterPart;
  }
}
