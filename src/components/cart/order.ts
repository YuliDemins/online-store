import { IProduct } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { OrderCounter } from './orderCounter';

export class Order extends BaseComponent {
  private number: BaseComponent;

  private image: BaseComponent;

  private info: BaseComponent;

  private title: BaseComponent;

  private desc: BaseComponent;

  private orderCounter: OrderCounter;

  private orderPrice: BaseComponent;

  private orderPriceSpan: BaseComponent;

  private inStock: BaseComponent;

  private inStockSpan: BaseComponent;

  private orderDelete: BaseComponent;

  id: number;

  price: number;

  amount: number;

  constructor(
    title: string,
    thumbnail: string,
    description: string,
    stock: number,
    price: number,
    amount: number,
    id: number,
    callback: () => void,
    orderNum: number,
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
      textContent: `${orderNum}`,
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
      textContent: 'in stock ',
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
    this.orderCounter.onCountChange(this.updateOrder.bind(this), id);
    this.orderCounter.onCountChange(callback, id);

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
    if (cards[index]) {
      cards[index].amount = +val;
      window.localStorage.setItem('productsList', JSON.stringify(cards));

      this.orderPrice.elem.textContent = `${+(this.orderCounter.count.elem.getAttribute('value') ?? 1) * this.price}$`;
    } else {
      this.destroy();
    }
  }
}
