import { BaseComponent } from '@/services/BaseComponent';

export class Home extends BaseComponent {
  wrapper: BaseComponent;

  title;

  constructor() {
    super({
      tag: 'div',
      className: 'home',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'wrapper',
    });

    this.title = new BaseComponent({
      tag: 'h1',
      className: 'title',
      textContent: 'Home',
    });
  }

  render() {
    this.wrapper.addChildren(this.title.elem);
    this.addChildren(this.wrapper.elem);
  }
}
