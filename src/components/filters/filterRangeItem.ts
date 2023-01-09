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

    this.inputRangeStart.elem.addEventListener('mouseup', () => {
      this.showRangeFilter(type);
    });

    this.inputRangeEnd.elem.addEventListener('input', () => {
      if (this.inputRangeEnd.elem instanceof HTMLInputElement && this.inputNumEnd.elem instanceof HTMLInputElement) {
        this.progress.elem.style.right = `${100 - (Number(this.inputRangeEnd.elem.value) * 100) /
        Number(this.inputRangeEnd.elem.max)}%`;
        this.inputNumEnd.elem.value = this.inputRangeEnd.elem.value;
      }
    });

    this.inputRangeEnd.elem.addEventListener('mouseup', () => {
      this.showRangeFilter(type);
    });
  }

  async showRangeFilter(target: RangeTypes) {
    const productsElem = await getProducts();
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
    show(productsFilterElem);
  }

  async getFiltersView(type: RangeTypes) {
    const productsElem = await getProducts();
    const arr = this.getFilter(productsElem, type);
    const forFilters = arr.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
    if (this.inputRangeStart.elem instanceof HTMLInputElement &&
      this.inputRangeEnd.elem instanceof HTMLInputElement &&
      this.inputNumStart.elem instanceof HTMLInputElement &&
      this.inputNumEnd.elem instanceof HTMLInputElement) {
      this.inputNumStart.elem.placeholder = forFilters.slice(0, 1).join('');
      this.inputRangeStart.elem.min = forFilters.slice(0, 1).join('');
      this.inputRangeStart.elem.max = forFilters.slice(-1).join('');
      this.inputRangeEnd.elem.min = forFilters.slice(0, 1).join('');
      this.inputNumEnd.elem.placeholder = forFilters.slice(-1).join('');
      this.inputRangeEnd.elem.max = forFilters.slice(-1).join('');
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
