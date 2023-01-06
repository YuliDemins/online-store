import { BaseComponent } from '@/services/BaseComponent';
import { PromoHint } from './promoHint';
import { PromoUsed } from './promoUsed';

export class Promo extends BaseComponent {
  promoInput: BaseComponent;

  promoVars: BaseComponent;

  promoUsed: PromoUsed;

  promoHint: PromoHint;

  constructor(callback: (e: Event) => void, newTitle: BaseComponent, oldTitle: BaseComponent) {
    super({
      tag: 'div',
      className: 'promo',
    });

    this.promoUsed = new PromoUsed(newTitle, oldTitle);
    this.promoUsed.render();

    this.promoInput = new BaseComponent({
      tag: 'input',
      className: 'total__input',
      attributes: {
        type: 'text',
        placeholder: 'Ввести промокод',
      },
    });

    this.promoHint = new PromoHint();

    this.promoVars = new BaseComponent({
      tag: 'p',
      className: 'promo__options',
      textContent: "Promo for test: 'ALT', 'SALT'",
    });

    this.checkForPromo(callback);
  }

  render() {
    this.addChildren(this.promoUsed, this.promoInput, this.promoHint, this.promoVars);
  }

  checkForPromo(callback: (e: Event) => void) {
    this.promoInput.elem.addEventListener('input', callback);
  }
}
