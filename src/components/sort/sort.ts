import { getProducts } from '@/services/api';
import { BaseComponent } from '@/services/BaseComponent';
import { IProduct } from '@/types/interfaces/product';
import { ProductCard } from '../products/productCard';

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

    this.sort();
  }

  render() {
    this.sortRatingDown.addChildren(this.sortRatingDownText.elem, this.sortRatingDownSpan.elem);
    this.sortRatingUp.addChildren(this.sortRatingUpText.elem, this.sortRatingUpSpan.elem);
    this.sortPriceDown.addChildren(this.sortPriceDownText.elem, this.sortPriceDownSpan.elem);
    this.sortPriceUp.addChildren(this.sortPriceUpText.elem, this.sortPriceUpSpan.elem);
    this.addChildren(this.sortRatingDown.elem, this.sortRatingUp.elem, this.sortPriceDown.elem, this.sortPriceUp.elem);
  }

  async show(callback: ((a: IProduct, b: IProduct) => number) | undefined) {
    const productsElem = await getProducts();

    productsElem.sort(callback);
    // console.log(productsElem);

    const newRender = document.querySelector<HTMLElement>('.proposals__list');
    newRender!.innerHTML = '';
    productsElem.map((item: IProduct) => {
      const elem = new ProductCard(
        item.id,
        item.title,
        item.rating,
        item.price,
        item.category,
        item.thumbnail,
        item.images,
        item.stock,
        item.brand,
        item.description,
        item.discountPercentage,
      );
      elem.render();
      newRender?.appendChild(elem.elem);
      return elem.elem;
    });
  }

  sort() {
    this.sortPriceUp.elem.addEventListener('click', () => {
      if (this.sortPriceUp.elem.classList.contains('active_sort')) {
        this.sortPriceUp.elem.classList.remove('active_sort');
        this.show((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
      } else {
        this.sortPriceUp.elem.classList.add('active_sort');
        this.show((a: { price: number; }, b: { price: number; }) => a.price - b.price);
      }
    });

    this.sortPriceDown.elem.addEventListener('click', () => {
      this.sortPriceDown.elem.classList.add('active_sort');
      this.show((a: { price: number; }, b: { price: number; }) => b.price - a.price);
    });

    this.sortRatingUp.elem.addEventListener('click', () => {
      this.sortRatingUp.elem.classList.add('active_sort');
      this.show((a: { rating: number; }, b: { rating: number; }) => a.rating - b.rating);
    });

    this.sortRatingDown.elem.addEventListener('click', () => {
      this.sortRatingDown.elem.classList.add('active_sort');
      this.show((a: { rating: number; }, b: { rating: number; }) => b.rating - a.rating);
    });
  }
}
