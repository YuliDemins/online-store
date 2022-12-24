import { BaseComponent } from '@/services/BaseComponent';

export class Preloader extends BaseComponent {
  private loader;

  constructor() {
    super({
      tag: 'div',
      className: 'preloader',
    });

    this.loader = new BaseComponent({
      tag: 'div',
      className: 'loader',
    });
  }

  render() {
    this.addChildren(this.loader.elem);
  }

  hide() {
    window.onload = () => {
      const preloader = document.querySelector('.preloader');
      if (preloader instanceof HTMLElement) {
        preloader.classList.add('hide-preloader');
        setTimeout(() => {
          if (preloader instanceof HTMLElement) {
            preloader.classList.add('preloader-hidden');
          }
        }, 1000);
      }
    };
  }
}
