import { BaseComponent } from '@/services/BaseComponent';
import { Filters } from '../filters/filters';
import { ProductList } from '../products/productList';

export class Home extends BaseComponent {
  wrapper: BaseComponent;

  list: ProductList;

  filters: Filters;

  constructor() {
    super({
      tag: 'div',
      className: 'home',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'wrapper',
    });

    this.filters = new Filters();
    this.filters.render();

    this.list = new ProductList();
    this.list.render();
  }

  render() {
    this.wrapper.addChildren(this.filters.elem, this.list.elem);

    this.addChildren(this.wrapper.elem);
    console.log(this.filters);
  }
}
