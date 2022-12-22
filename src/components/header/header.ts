import { BaseComponent } from '@/services/BaseComponent';

export class Header extends BaseComponent {
  private wrapper;

  private title;

  constructor() {
    super({
      tag: 'header',
      className: 'header',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'header__wrapper',
    });

    this.title = new BaseComponent({
      tag: 'h1',
      className: 'title',
      textContent: 'Store',
    });
  }

  render() {
    this.wrapper.addChildren(this.title.elem);
    this.addChildren(this.wrapper.elem);
  }
}