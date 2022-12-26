// <div class="total">
//   <div class="total-title">В корзине</div>
//   <div class="total-count">2 <span>товара</span></div>
//   <input class="total-input" type="text" placeholder="Ввести промокод">
//   <div class="total-price">1249 <span>$</span></div>

//   <button class="total-btn">Перейти к оформлению</button>
// </div>
import { BaseComponent } from '@/services/BaseComponent';

export class Total extends BaseComponent {
  private title;

  totalCount: BaseComponent;

  totalCountSpan: BaseComponent;

  totalInput: BaseComponent;

  totalPrice: BaseComponent;

  totalPriceSpan: BaseComponent;

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
      textContent: '2',
    });

    this.totalCountSpan = new BaseComponent({
      tag: 'span',
      className: 'total__count-span',
      textContent: 'товара',
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
      textContent: '1249',
    });

    this.totalPriceSpan = new BaseComponent({
      tag: 'span',
      className: 'total__price-span',
      textContent: '$',
    });

    this.totalBtn = new BaseComponent({
      tag: 'button',
      className: 'total__btn',
      textContent: ' Перейти к оформлению',
    });
  }

  render() {
    this.totalPrice.addChildren(this.totalPriceSpan);
    this.totalCount.addChildren(this.totalCountSpan.elem);
    this.addChildren(
      this.title.elem,
      this.totalCount.elem,
      this.totalInput.elem,
      this.totalPrice.elem,
      this.totalBtn.elem,
    );
  }
}
