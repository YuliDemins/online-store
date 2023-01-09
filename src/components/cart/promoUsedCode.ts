import { BaseComponent } from '@/services/BaseComponent';

export class PromoUsedCode extends BaseComponent {
  promoUsedCodeName: BaseComponent;

  promoUsedCodeBtn: BaseComponent;

  id: string;

  constructor(name: string, id: string) {
    super({
      tag: 'div',
      className: 'promo__used-code',
      attributes: {
        'data-id': id,
      },
    });

    this.id = id;
    this.promoUsedCodeName = new BaseComponent({
      tag: 'p',
      className: 'promo__used-code-name',
      textContent: name,
    });

    this.promoUsedCodeBtn = new BaseComponent({
      tag: 'button',
      className: 'promo__used-code-btn',
      textContent: 'Drop',
    });
  }

  render() {
    this.addChildren(this.promoUsedCodeName, this.promoUsedCodeBtn);
  }
}
