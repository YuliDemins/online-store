import { BaseComponent } from '@/services/BaseComponent';
import { HeaderCart } from './HeaderCart';
import { HeaderInput } from './headerInput';

export class Header extends BaseComponent {
  private wrapper;

  private title;

  public Cart: HeaderCart;

  input: HeaderInput;

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
      className: 'header__title',
      textContent: 'SmartStore',
    });

    this.input = new HeaderInput();
    this.input.render();

    this.Cart = new HeaderCart();
    this.Cart.render();
  }

  render() {
    this.wrapper.addChildren(this.title.elem, this.input.elem, this.Cart.elem);
    this.addChildren(this.wrapper.elem);
  }
}
