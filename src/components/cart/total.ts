import { IPromo } from '@/interfaces/interfaces';
import { IProductData } from '@/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { promoState } from '@/states/promoState';
import { Promo } from './promo';
import { PromoUsedCode } from './promoUsedCode';

export class Total extends BaseComponent {
  private title: BaseComponent;

  totalCount: BaseComponent;

  totalPrice: BaseComponent;

  totalPriceDiscount: BaseComponent;

  totalBtn: BaseComponent;

  Promo: Promo;

  constructor() {
    super({
      tag: 'div',
      className: 'total',
    });

    this.totalPrice = new BaseComponent({
      tag: 'div',
      className: 'total__price',
      textContent: `${this.calcTotalPrice(JSON.parse(window.localStorage.getItem('productsList') ?? '[]'))}$`,
    });

    this.totalPriceDiscount = new BaseComponent({
      tag: 'div',
      className: 'total__price',
      textContent: `${this.calcAmountWithPromo()}$`,
    });

    this.Promo = new Promo(this.update.bind(this), this.totalPrice, this.totalPriceDiscount);
    this.Promo.render();
    this.onPromoDelete();

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
      this.Promo,
      this.totalPrice.elem,
      this.totalPriceDiscount.elem,
      this.totalBtn.elem,
    );
  }

  calcTotalPrice(arr: IProductData[]) {
    return arr.reduce((p, k) => +p + (+k.price * +k.amount), 0);
  }

  calcTotalAmount(arr: IProductData[]) {
    return arr.reduce((p, k) => +p + (+k.amount), 0);
  }

  calcAmountWithPromo() {
    const totalAmount = this.calcTotalPrice(JSON.parse(window.localStorage.getItem('productsList') ?? '[]'));
    const allPromos = (JSON.parse(window.localStorage.getItem('usedPromos') ?? '[]'));
    const percent = allPromos.reduce((p: number, k: IPromo) => p + +k.disc, 0);

    console.log(percent);
    return (Math.round(totalAmount * +`0.${(100 - percent)}`));
  }

  updateDiscountTitle() {
    this.totalPriceDiscount.elem.textContent = `${this.calcAmountWithPromo()}$`;
  }

  update(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target) {
      const item = promoState.find((promo) => promo.id === target.value.toLowerCase());
      if (item?.id) {
        this.Promo.promoHint.promoHintText.elem.textContent = item.descr;
        this.Promo.promoHint.render();
        this.Promo.promoHint.btnOnClick(item, this.updateTitle.bind(this));
      } else {
        this.Promo.promoHint.promoHintInner.destroy();
      }
    }
  }

  updateTitle() {
    this.Promo.promoUsed.updatePromos(this.totalPrice, this.totalPriceDiscount);
    this.updateDiscountTitle();
    this.onPromoDelete();
  }

  onPromoDelete() {
    this.Promo.promoUsed.promoUsedCode.forEach((element: PromoUsedCode) => {
      element.promoUsedCodeBtn.elem.addEventListener('click', () => {
        let arr = JSON.parse(window.localStorage.getItem('usedPromos') ?? '[]');
        arr = arr.filter((item: IPromo) => item.id !== element.id);

        window.localStorage.setItem('usedPromos', JSON.stringify(arr));
        element.destroy();
        this.updateDiscountTitle();
        if (arr.length === 0) {
          this.totalPrice.elem.classList.remove('old-price');
          this.totalPriceDiscount.elem.classList.remove('show');
          this.totalPriceDiscount.elem.classList.add('hide');
        }
      });
    });
  }
}
