import { BaseComponent } from '@/services/BaseComponent';

export class NotFound extends BaseComponent {
  wrapper;

  title;

  constructor() {
    super({
      tag: 'div',
      className: '404',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'wrapper',
    });

    this.title = new BaseComponent({
      tag: 'h1',
      className: 'title',
      textContent: '404 Page Not Found',
    });
  }

  render() {
    this.wrapper.addChildren(this.title.elem);
    this.addChildren(this.wrapper.elem);
  }
}
