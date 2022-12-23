<<<<<<< HEAD
import { createElement } from '@/utils';

export default class Home {
  root: HTMLElement | null;

  home: HTMLElement;

  constructor() {
    this.home = createElement('div', 'home', '');

    this.root = document.getElementById('root');
    this.root?.append(this.home);
=======
// import { createElement } from '@/utils';
import { BaseComponent } from '@/services/BaseComponent';

export default class Home extends BaseComponent {
  wrapper: BaseComponent;

  // home: HTMLElement | PromiseLike<HTMLElement>;
  // root: HTMLElement | null;
  constructor() {
    super({
      tag: 'div',
      className: 'home',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'wrapper',
    });
    // this.home = createElement('div', 'home', '');

    // this.root = document.getElementById('root');
    // this.root?.append(this.home);
  }

  render() {
    // this.wrapper.addChildren();
    this.addChildren(this.wrapper.elem);
>>>>>>> develop
  }
}
