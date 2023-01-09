import { IPromo } from '@/types/interfaces/interfaces';
import { BaseComponent } from '@/services/BaseComponent';

export class PromoHint extends BaseComponent {
  promoHintBtn: BaseComponent;

  promoHintText: BaseComponent;

  promoHintInner: BaseComponent;

  constructor() {
    super({
      tag: 'div',
      className: 'promo__hint',
    });

    this.promoHintInner = new BaseComponent({
      className: 'promo__hint-inner',
    });

    this.promoHintText = new BaseComponent({
      tag: 'p',
      className: 'promo__hint-text',
    });

    this.promoHintBtn = new BaseComponent({
      tag: 'button',
      className: 'promo__hint-button',
      textContent: 'Add',
    });
  }

  render() {
    this.promoHintInner.addChildren(this.promoHintText, this.promoHintBtn);
    this.addChildren(this.promoHintInner);
  }

  btnOnClick(item: IPromo, callback: () => void) {
    this.promoHintBtn.elem.onclick = (() => {
      const arr = JSON.parse(window.localStorage.getItem('usedPromos') ?? '[]');
      console.log(10);
      if (arr.find((elem: IPromo) => elem.id === item.id)) {
        return;
      }

      arr.push(item);
      window.localStorage.setItem('usedPromos', JSON.stringify(arr));
      callback();
    });
  }
}
