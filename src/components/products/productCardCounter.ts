import { BaseComponent } from '@/services/BaseComponent';

export class ProductCardCounter extends BaseComponent {
  private count;

  private counterDec;

  private counterInc;

  constructor() {
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
      },
    });

    this.counterInc = new BaseComponent({
      tag: 'span',
      className: 'proposals__list-item-inc',
      textContent: '+',
    });
    this.changeCountValue();
  }

  render() {
    this.addChildren(this.counterDec, this.count, this.counterInc);
  }

  changeCountValue() {
    this.counterDec.elem.addEventListener('click', () => {
      if (this.count.elem instanceof HTMLInputElement && +this.count.elem.value > 1) {
        this.count.elem.value = `${+this.count.elem.value - 1}`;
      }
    });

    this.counterInc.elem.addEventListener('click', () => {
      if (this.count.elem instanceof HTMLInputElement) {
        this.count.elem.value = `${+this.count.elem.value + 1}`;
      }
    });
  }
}
