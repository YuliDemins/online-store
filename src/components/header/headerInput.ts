import { BaseComponent } from '@/services/BaseComponent';
import { press } from '@/services/update';

export class HeaderInput extends BaseComponent {
  mainSearchInput: BaseComponent;

  mainSearchBtn: BaseComponent;

  constructor() {
    super({
      tag: 'form',
      className: 'main-search',
    });
    this.mainSearchInput = new BaseComponent({
      tag: 'input',
      className: 'main-search__input',
      attributes: {
        type: 'text',
        placeholder: 'Search for anything',
      },
    });

    this.mainSearchBtn = new BaseComponent({
      tag: 'input',
      className: 'main-search__btn',
      attributes: {
        type: 'button',
      },
    });
  }

  render() {
    this.addChildren(this.mainSearchInput.elem, this.mainSearchBtn.elem);
    press(this.mainSearchInput.elem);
  }
}
