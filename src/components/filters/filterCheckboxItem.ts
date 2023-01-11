import { BaseComponent } from '@/services/BaseComponent';
import { press } from '@/services/update';
import { CheckboxTypes } from '@/types/CheckboxTypes';

export class FilterСheckboxItem extends BaseComponent {
  span: BaseComponent;

  input:BaseComponent;

  constructor(elem: string, type: CheckboxTypes) {
    super({
      tag: 'label',
      className: 'filter-category-form',
      textContent: elem,
    });
    this.input = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        name: type,
        value: elem,
      },
    });

    this.span = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });
  }

  render() {
    this.addChildren(this.input.elem, this.span.elem);
    press(this.input.elem);
  }
}
