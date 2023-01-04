import { IProductData } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';

export class Total extends BaseComponent {
  private title;

  totalCount: BaseComponent;

  totalInput: BaseComponent;

  totalPrice: BaseComponent;

  totalBtn: BaseComponent;

  constructor() {
    super({
      tag: 'div',
      className: 'total',
    });

    this.title = new BaseComponent({
      tag: 'div',
      className: 'total__title',
      textContent: 'В корзине',
    });

    this.totalCount = new BaseComponent({
      tag: 'div',
      className: 'total__count',
      textContent: `${this.calcTotalAmount(JSON.parse(window.localStorage.getItem('productsList') ?? '[]'))} items`,
    });

    this.totalInput = new BaseComponent({
      tag: 'input',
      className: 'total__input',
      attributes: {
        type: 'text',
        placeholder: 'Ввести промокод',
      },
    });

    this.totalPrice = new BaseComponent({
      tag: 'div',
      className: 'total__price',
      textContent: `${this.calcTotalPrice(JSON.parse(window.localStorage.getItem('productsList') ?? '[]'))}$`,
    });

    this.totalBtn = new BaseComponent({
      tag: 'button',
      className: 'total__btn',
      textContent: ' Перейти к оформлению',
    });
  }

  render() {
    this.addChildren(
      this.title.elem,
      this.totalCount.elem,
      this.totalInput.elem,
      this.totalPrice.elem,
      this.totalBtn.elem,
    );
  }

  calcTotalPrice(arr: IProductData[]) {
    return arr.reduce((p, k) => +p + (+k.price * +k.amount), 0);
  }

  calcTotalAmount(arr: IProductData[]) {
    return arr.reduce((p, k) => +p + (+k.amount), 0);
  }
}
