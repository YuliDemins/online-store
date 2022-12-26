import { BaseComponent } from '@/services/BaseComponent';

export class Order extends BaseComponent {
  private number;

  private image;

  private info;

  private title;

  private desc;

  private orderCounter;

  private orderCounterDec;

  private orderCounterInc;

  private orderPrice;

  private orderPriceSpan;

  private inStock;

  private inStockSpan;

  private orderCounterNumber;

  private orderDelete;

  constructor() {
    super({
      tag: 'div',
      className: 'order',
    });

    this.number = new BaseComponent({
      tag: 'div',
      className: 'order__number',
      textContent: '1',
    });
    this.image = new BaseComponent({
      tag: 'div',
      className: 'order__image',
    });

    this.info = new BaseComponent({
      tag: 'div',
      className: 'order__info',
    });

    this.title = new BaseComponent({
      tag: 'div',
      className: 'order__info-title',
      textContent: 'iPhone 13',
    });

    this.desc = new BaseComponent({
      tag: 'div',
      className: 'order__info-desc',
      textContent: 'Дополнительная информация...',
    });
    this.inStock = new BaseComponent({
      tag: 'div',
      className: 'order__instock',
      textContent: 'В наличии ',
    });
    this.inStockSpan = new BaseComponent({
      tag: 'span',
      className: 'order__instock-span',
      textContent: '3',
    });
    this.orderCounter = new BaseComponent({
      tag: 'div',
      className: 'order__counter',
    });
    this.orderCounterDec = new BaseComponent({
      tag: 'span',
      className: 'order__counter-dec',
      textContent: '-',
    });
    this.orderCounterNumber = new BaseComponent({
      tag: 'input',
      className: 'order__counter-number',
      textContent: '-',
      attributes: {
        type: 'number',
        value: '1',
      },
    });
    this.orderCounterInc = new BaseComponent({
      tag: 'span',
      className: 'order__counter-inc',
      textContent: '+',
    });

    this.orderPrice = new BaseComponent({
      tag: 'div',
      className: 'order__price',
      textContent: '549',
    });
    this.orderPriceSpan = new BaseComponent({
      tag: 'span',
      className: 'order__price-span',
      textContent: '$',
    });
    this.orderDelete = new BaseComponent({
      tag: 'div',
      className: 'order__delete',
    });
  }

  render() {
    this.orderPrice.addChildren(this.orderPriceSpan.elem);
    this.orderCounter.addChildren(this.orderCounterDec.elem, this.orderCounterNumber.elem, this.orderCounterInc.elem);
    this.inStock.addChildren(this.inStockSpan);
    this.info.addChildren(this.title.elem, this.desc.elem);
    this.addChildren(
      this.number.elem,
      this.image.elem,
      this.info.elem,
      this.inStock.elem,
      this.orderCounter.elem,
      this.orderPrice.elem,
      this.orderDelete.elem,
    );
  }
}
