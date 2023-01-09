import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { RangeTypes } from '@/types/RangeTypes';
import { getProducts } from '@/services/api';
import { show } from '@/services/update';

export class FilterRangeItem extends BaseComponent {
  wrapper: BaseComponent;

  controls: BaseComponent;

  labelRangeStart: BaseComponent;

  inputRangeStart: BaseComponent;

  labelRangeEnd: BaseComponent;

  inputRangeEnd: BaseComponent;

  line: BaseComponent;

  progress: BaseComponent;

  span: BaseComponent;

  labelNumStart: BaseComponent;

  inputNumStart: BaseComponent;

  labelNumEnd: BaseComponent;

  inputNumEnd: BaseComponent;

  constructor(type: RangeTypes) {
    super({
      tag: 'div',
      className: ['filter-category-item__range', 'range'],
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'range__wrapper',
    });

    this.labelNumStart = new BaseComponent({
      tag: 'label',
      className: 'range__label',
      textContent: '$',
    });
    this.inputNumStart = new BaseComponent({
      tag: 'input',
      className: 'range__input',
      attributes: {
        type: 'number',
        placeholder: '0',
      },
    });

    this.span = new BaseComponent({
      tag: 'div',
      className: 'range__include',
      textContent: '-',
    });

    this.labelNumEnd = new BaseComponent({
      tag: 'label',
      className: 'range__label',
      textContent: '$',
    });
    this.inputNumEnd = new BaseComponent({
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
    this.labelRangeStart = new BaseComponent({
      tag: 'label',
      className: ['range__label', 'range__label_range'],
    });
    this.inputRangeStart = new BaseComponent({
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
    this.labelRangeEnd = new BaseComponent({
      tag: 'label',
      className: ['range__label', 'range__label_range'],
    });
    this.inputRangeEnd = new BaseComponent({
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
    this.labelRangeStart.addChildren(this.inputRangeStart.elem);
    this.labelRangeEnd.addChildren(this.inputRangeEnd.elem);
    this.controls.addChildren(this.labelRangeStart.elem, this.labelRangeEnd.elem);
    this.labelNumStart.addChildren(this.inputNumStart);
    this.labelNumEnd.addChildren(this.inputNumEnd.elem);
    this.wrapper.addChildren(this.labelNumStart.elem, this.span.elem, this.labelNumEnd.elem);
    this.addChildren(this.wrapper.elem, this.line.elem, this.controls);
    this.getFiltersView(type);
  }

  change(type: RangeTypes) {
    this.inputRangeStart.elem.addEventListener('input', () => {
      if (this.inputRangeStart.elem instanceof HTMLInputElement &&
        this.inputNumStart.elem instanceof HTMLInputElement) {
        this.progress.elem.style.left = `${(Number(this.inputRangeStart.elem.value) * 100)
          / Number(this.inputRangeStart.elem.max)}%`;
        this.inputNumStart.elem.value = this.inputRangeStart.elem.value;
      }
    });

    this.inputRange1.elem.addEventListener('mouseup', () => {
      this.show(type);
    });

    this.inputRangeEnd.elem.addEventListener('input', () => {
      if (this.inputRangeEnd.elem instanceof HTMLInputElement && this.inputNumEnd.elem instanceof HTMLInputElement) {
        this.progress.elem.style.right = `${100 - (Number(this.inputRangeEnd.elem.value) * 100) /
        Number(this.inputRangeEnd.elem.max)}%`;
        this.inputNumEnd.elem.value = this.inputRangeEnd.elem.value;
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
      if (this.inputRangeStart.elem instanceof HTMLInputElement &&
        this.inputRangeEnd.elem instanceof HTMLInputElement) {
        if (item[target] >= Number(this.inputRangeStart.elem.value)
        && item[target] <= Number(this.inputRangeEnd.elem.value)) {
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

  getFilter(arr: IProduct[], type: RangeTypes) {
    const filterPart: string[] = [];
    arr.map((item) => {
      filterPart.push(item[type].toString());
      return filterPart;
    });
    return filterPart;
  }
}
