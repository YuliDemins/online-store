import { BaseComponent } from '@/services/BaseComponent';

export class ProductCardCounter extends BaseComponent {
  private count;

  private counterDec;

  private counterInc;

  constructor(limit: number) {
    super({
      tag: 'div',
      className: 'proposals__list-item-counter',
    });

    this.counterDec = new BaseComponent({
      tag: 'span',
      className: 'proposals__list-item-dec',
      textContent: '-',
    });

    this.count = new BaseComponent({
      tag: 'input',
      className: 'proposals__list-item-count',
      attributes: {
        type: 'name',
        value: '1',
        readonly: 'readonly',
        style: 'outline: none',
      },
    });

    this.counterInc = new BaseComponent({
      tag: 'span',
      className: 'proposals__list-item-inc',
      textContent: '+',
    });
    this.changeCountValue(limit);
  }

  render() {
    this.addChildren(this.counterDec, this.count, this.counterInc);
  }

  changeCountValue(limit: number) {
    this.counterDec.elem.addEventListener('click', () => {
      if (this.count.elem instanceof HTMLInputElement && +this.count.elem.value > 1) {
        this.count.elem.value = `${+this.count.elem.value - 1}`;
      }
    });

    this.counterInc.elem.addEventListener('click', () => {
      if (this.count.elem instanceof HTMLInputElement && +this.count.elem.value < limit) {
        this.count.elem.value = `${+this.count.elem.value + 1}`;
      }
    });
  }
}
