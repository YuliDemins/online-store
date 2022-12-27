import { BaseComponent } from '@/services/BaseComponent';
import { SliderItem } from '../slider/sliderItem';

export class ProductCard extends BaseComponent {
  image;

  // link;

  info;

  rating;

  ratingStars;

  ratingCount;

  infoStock1;

  infoStock3;

  infoStock2;

  infoStock4;

  infoStock5;

  infoStock;

  title;

  titleLink;

  categoryLink;

  category;

  price;

  priceLink;

  priceSpan;

  counter;

  counterDec;

  count;

  counterInc;

  order;

  btnCardPlus;

  slider;

  constructor(id:string) {
    super({
      tag: 'div',
      className: 'proposals__list-item',
    });

    this.slider = new SliderItem(id);
    this.slider.render();

    this.image = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-image',
    });

    // this.link = new BaseComponent({
    //   tag: 'a',
    //   className: 'proposals__list-item-link',
    //   attributes: {
    //     href: '#',
    //   },
    // });

    this.info = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-info',
    });
    this.rating = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-rating',
    });
    this.ratingStars = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-rating-stars',
    });
    this.ratingCount = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-rating-count',
      textContent: '4.7',
    });

    this.infoStock = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stock',
    });

    this.infoStock1 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stockval',
    });
    this.infoStock2 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stockval',
    });
    this.infoStock3 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stockval',
    });
    this.infoStock4 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stockval',
    });
    this.infoStock5 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stockval',
    });
    this.title = new BaseComponent({
      tag: 'h4',
      className: 'proposal__list-item-title',
    });

    this.titleLink = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-title-link',
      textContent: 'iPhone 13',
      attributes: {
        href: '#',
      },
    });

    this.category = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-category',
    });
    this.categoryLink = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-category-link',
      textContent: 'телефон',
      attributes: {
        href: '#',
      },
    });

    this.price = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-price',
    });
    this.priceLink = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-price-link',
      textContent: '549',
      attributes: {
        href: '#',
      },
    });
    this.priceSpan = new BaseComponent({
      tag: 'span',
      className: 'proposals__list-item-price-span',
      textContent: '$',
    });

    this.order = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-order',
    });
    this.counter = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-counter',
    });
    this.counterDec = new BaseComponent({
      tag: 'span',
      className: 'proposals__list-item-dec',
      textContent: '-',
    });
    this.count = new BaseComponent({
      tag: 'input',
      className: 'proposals__list-item-count',
      attributes: {
        type: 'name',
        value: '1',
      },
    });
    this.counterInc = new BaseComponent({
      tag: 'span',
      className: 'proposals__list-item-inc',
      textContent: '+',
    });
    this.btnCardPlus = new BaseComponent({
      tag: 'button',
      className: 'proposals__list-item-card',
    });
  }

  render() {
    this.image.addChildren(this.slider);
    this.order.addChildren(this.counter, this.btnCardPlus);
    this.counter.addChildren(this.counterDec, this.count, this.counterInc);
    this.priceLink.addChildren(this.priceSpan);
    this.price.addChildren(this.priceLink);
    this.category.addChildren(this.categoryLink);
    this.title.addChildren(this.titleLink);
    this.infoStock.addChildren(this.infoStock1, this.infoStock2, this.infoStock3, this.infoStock4, this.infoStock5);
    this.rating.addChildren(this.ratingStars, this.ratingCount);
    this.info.addChildren(this.rating, this.infoStock);
    this.addChildren(
      this.image.elem,
      this.info.elem,
      this.title.elem,
      this.category.elem,
      this.price.elem,
      this.order.elem,
    );
  }
}
