import { BaseComponent } from '@/services/BaseComponent';

export class PromoUsed extends BaseComponent {
  promoUsedCodeName;

  promoUsedCodeBtn;

  constructor() {
    super({
      tag: 'div',
      className: 'promo__used-code',
    });

    this.promoUsedCodeName = new BaseComponent({
      tag: 'p',
      className: 'promo__used-code-name',
      textContent: 'leavePls',
    });

    this.promoUsedCodeBtn = new BaseComponent({
      tag: 'button',
      className: 'promo__used-code-btn',
      textContent: 'Drop',
    });
  }
}
