import { BaseComponent } from '@/services/BaseComponent';

export class ErrorModalField extends BaseComponent {
  constructor(text = 'error') {
    super({
      tag: 'p',
      className: 'modal__error',
      textContent: `${text}`,
      attributes: {
        style: 'color: red',
      },
    });
  }
}
