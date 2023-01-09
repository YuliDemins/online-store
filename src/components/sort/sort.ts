import { getProducts } from '@/services/api';
import { BaseComponent } from '@/services/BaseComponent';
import { IProduct } from '@/types/interfaces/product';
import { show } from '../../services/update';

export class Sort extends BaseComponent {
  sortPriceUp: BaseComponent;

  sortPriceDown: BaseComponent;

  sortRatingUp: BaseComponent;

  sortRatingDown: BaseComponent;

  sortPriceUpSpan: BaseComponent;

  sortPriceUpText: BaseComponent;

  sortPriceDownText: BaseComponent;

  sortPriceDownSpan: BaseComponent;

  sortRatingUpText: BaseComponent;

  sortRatingUpSpan: BaseComponent;

  sortRatingDownText: BaseComponent;

  sortRatingDownSpan: BaseComponent;

  constructor() {
    super({
      tag: 'div',
      className: 'sort',
    });

    this.sortRatingUpSpan = new BaseComponent({
      tag: 'div',
      className: 'sort__item-span-up',
    });
    this.sortRatingDown = new BaseComponent({
      tag: 'div',
      className: 'sort__item',
    });
    this.sortRatingDownText = new BaseComponent({
      tag: 'div',
      className: 'sort__item-text',
      textContent: 'rating',
    });
    this.sortRatingDownSpan = new BaseComponent({
      tag: 'div',
      className: 'sort__item-span-down',
    });

    this.sortPriceUp = new BaseComponent({
      tag: 'div',
      className: 'sort__item',
    });
    this.sortPriceUpText = new BaseComponent({
      tag: 'div',
      className: 'sort__item-text',
      textContent: 'prise',
    });
    this.sortPriceUpSpan = new BaseComponent({
      tag: 'div',
      className: 'sort__item-span-up',
    });

    this.sortPriceDown = new BaseComponent({
      tag: 'div',
      className: 'sort__item',
    });
    this.sortPriceDownText = new BaseComponent({
      tag: 'div',
      className: 'sort__item-text',
      textContent: 'prise',
    });
    this.sortPriceDownSpan = new BaseComponent({
      tag: 'div',
      className: 'sort__item-span-down',
    });

    this.sortRatingUp = new BaseComponent({
      tag: 'div',
      className: 'sort__item',
    });
    this.sortRatingUpText = new BaseComponent({
      tag: 'div',
      className: 'sort__item-text',
      textContent: 'rating',
    });

    this.sort(this.sortPriceUp.elem, (a, b) => a.price - b.price);
    this.sort(this.sortPriceDown.elem, (a, b) => b.price - a.price);
    this.sort(this.sortRatingUp.elem, (a, b) => a.rating - b.rating);
    this.sort(this.sortRatingDown.elem, (a, b) => b.rating - a.rating);
  }

  render() {
    this.sortRatingDown.addChildren(this.sortRatingDownText.elem, this.sortRatingDownSpan.elem);
    this.sortRatingUp.addChildren(this.sortRatingUpText.elem, this.sortRatingUpSpan.elem);
    this.sortPriceDown.addChildren(this.sortPriceDownText.elem, this.sortPriceDownSpan.elem);
    this.sortPriceUp.addChildren(this.sortPriceUpText.elem, this.sortPriceUpSpan.elem);
    this.addChildren(this.sortRatingDown.elem, this.sortRatingUp.elem, this.sortPriceDown.elem, this.sortPriceUp.elem);
  }

  async showSort(callback: ((a: IProduct, b: IProduct) => number) | undefined) {
    const productsElem = await getProducts();

    productsElem.sort(callback);
    show(productsElem);
  }

  sort(el: HTMLElement, callback: ((a: IProduct, b: IProduct) => number) | undefined) {
    el.addEventListener('click', () => {
      this.defineStyles(el, callback);
    });
  }

  defineStyles(el: HTMLElement, callback: ((a: IProduct, b: IProduct) => number) | undefined) {
    if (el.classList.contains('active_sort')) {
      el.classList.remove('active_sort');
      this.showSort((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
    } else {
      el.classList.add('active_sort');
      this.showSort(callback);
    }
  }
}
