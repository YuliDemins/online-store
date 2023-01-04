import { IProduct } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { OrderCounter } from './orderCounter';

export class Order extends BaseComponent {
  private number;

  private image;

  private info;

  private title;

  private desc;

  private orderCounter;

  private orderPrice;

  private orderPriceSpan;

  private inStock;

  private inStockSpan;

  private orderDelete;

  id;

  price;

  amount;

  constructor(
    title: string,
    thumbnail: string,
    description: string,
    stock: number,
    price: number,
    amount: number,
    id: number,
    callback: () => void,
  ) {
    super({
      tag: 'div',
      className: 'order',
    });

    this.id = id;
    this.price = price;
    this.amount = amount;

    this.number = new BaseComponent({
      tag: 'div',
      className: 'order__number',
      textContent: '1',
    });

    this.image = new BaseComponent({
      tag: 'div',
      className: 'order__image',
      attributes: {
        style: `background-image: url(${thumbnail})`,
      },
    });

    this.info = new BaseComponent({
      tag: 'div',
      className: 'order__info',
    });

    this.title = new BaseComponent({
      tag: 'div',
      className: 'order__info-title',
      textContent: `${title}`,
    });

    this.desc = new BaseComponent({
      tag: 'div',
      className: 'order__info-desc',
      textContent: `${description}`,
    });

    this.inStock = new BaseComponent({
      tag: 'div',
      className: 'order__instock',
      textContent: 'В наличии ',
    });

    this.inStockSpan = new BaseComponent({
      tag: 'span',
      className: 'order__instock-span',
      textContent: `${stock}`,
    });

    this.orderCounter = new OrderCounter(stock);

    if (this.orderCounter.count.elem instanceof HTMLInputElement) {
      this.orderCounter.count.elem.setAttribute('value', `${amount}`);
    }

    this.orderCounter.render();
    this.orderCounter.onCountChange(this.updateOrder.bind(this));
    this.orderCounter.onCountChange(callback);

    this.orderPrice = new BaseComponent({
      tag: 'div',
      className: 'order__price',
      textContent: `${price * amount}`,
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

  updateOrder() {
    const cards = JSON.parse(window.localStorage.getItem('productsList') ?? '[]');
    const index = cards.findIndex((item: IProduct) => item.id === this.id);
    const val = this.orderCounter.count.elem.getAttribute('value') ?? 0;
    cards[index].amount = +val;
    window.localStorage.setItem('productsList', JSON.stringify(cards));

    this.orderPrice.elem.textContent = `${+(this.orderCounter.count.elem.getAttribute('value') ?? 1) * this.price}$`;
  }
}
