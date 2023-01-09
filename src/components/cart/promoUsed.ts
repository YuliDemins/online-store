import { IPromo } from '@/types/interfaces/interfaces';
import { BaseComponent } from '@/services/BaseComponent';
import { PromoUsedCode } from './promoUsedCode';

export class PromoUsed extends BaseComponent {
  promoUsedTitle: BaseComponent;

  promoUsedCodes: BaseComponent;

  promoUsedCode: PromoUsedCode[];

  constructor(newTitle: BaseComponent, oldTitle: BaseComponent) {
    super({
      tag: 'div',
      className: 'promo__used',
    });

    this.promoUsedTitle = new BaseComponent({
      tag: 'h3',
      className: 'promo__used-title',
      textContent: 'Applied codes',
    });

    this.promoUsedCodes = new BaseComponent({
      tag: 'div',
      className: 'promo__used-codes',
    });

    this.promoUsedCode = this.updatePromos(newTitle, oldTitle);
  }

  render() {
    this.promoUsedCodes.addChildren(...this.promoUsedCode);
    this.addChildren(this.promoUsedTitle, this.promoUsedCodes);
  }

  updatePromos(oldTitle: BaseComponent, newTitle: BaseComponent) {
    const arr = JSON.parse(window.localStorage.getItem('usedPromos') ?? '[]').map((item: IPromo) => {
      const elem = new PromoUsedCode(item.descr, item.id);
      elem.render();
      return elem;
    });

    if (this.promoUsedCode) {
      this.promoUsedCodes.destroy();
      this.promoUsedCode = arr;
      this.render();
    }

    if (arr.length > 0) {
      oldTitle.elem.classList.add('old-price');
      newTitle.elem.classList.add('show');
    } else {
      oldTitle.elem.classList.remove('old-price');
      newTitle.elem.classList.add('hide');
    }

    return arr;
  }
}
