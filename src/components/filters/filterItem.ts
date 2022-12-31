import { BaseComponent } from '@/services/BaseComponent';

export class FiltersItem extends BaseComponent {
  span: BaseComponent;

  input;

  constructor(elem) {
    super({
      tag: 'label',
      className: 'filter-category-form',
      textContent: elem,
      attributes:{
        onclick: () => console.log('click'),
      }
    });
    this.input = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        // target: '_blank',
        name: 'brand',
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
    // this.checkValue();
  }

  // checkValue() {
  //   this.onclick = console.log('click');
  // }
}
