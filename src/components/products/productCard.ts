import { BaseComponent } from '@/services/BaseComponent';
import { Slider } from './slider';

export class ProductCard extends BaseComponent {
  image;

  // link;

  dots;

  dot1;

  dot2;

  dot3;

  info;

  ratingElem;

  ratingStars;

  ratingCount;

  infoStockValues: BaseComponent[];

  infoStock;

  title;

  titleLink;

  categoryLink;

  categoryElem;

  priceElem;

  priceLink;

  priceSpan;

  counter;

  counterDec;

  count;

  counterInc;

  order;

  btnCardPlus;

  slider: Slider;

  name: string;

  rating: number;

  price: number;

  category: string;

  thumbnail: string;

  constructor(name: string, rating: number, price: number, category: string, thumbnail: string) {
    super({
      tag: 'div',
      className: 'proposals__list-item',
    });

    this.name = name;
    this.thumbnail = thumbnail;
    this.category = category;
    this.price = price;
    this.rating = rating;

    this.slider = new Slider();
    this.slider.render();

    this.image = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-image',
      attributes: {
        style: `background-image: url(${this.thumbnail}`,
      },
    });

    // this.link = new BaseComponent({
    //   tag: 'a',
    //   className: 'proposals__list-item-link',
    //   attributes: {
    //     href: '#',
    //   },
    // });

    this.dots = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-dots',
    });

    this.dot1 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-dot',
    });
    this.dot2 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-dot',
    });
    this.dot3 = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-dot',
    });

    this.info = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-info',
    });

    this.ratingElem = new BaseComponent({
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
      textContent: `${this.rating}`,
    });

    this.infoStock = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stock',
    });

    this.infoStockValues = [];

    for (let i = 0; i < 5; i++) {
      const elem = new BaseComponent({
        tag: 'div',
        className: 'proposals__list-item-stockval',
      });

      this.infoStockValues.push(elem);
    }

    this.title = new BaseComponent({
      tag: 'h4',
      className: 'proposal__list-item-title',
    });

    this.titleLink = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-title-link',
      textContent: `${this.name}`,
      attributes: {
        href: '#',
      },
    });

    this.categoryElem = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-category',
    });
    this.categoryLink = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-category-link',
      textContent: `${this.category}`,
      attributes: {
        href: '#',
      },
    });

    this.priceElem = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-price',
    });
    this.priceLink = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-price-link',
      textContent: `${this.price}`,
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
    this.priceElem.addChildren(this.priceLink);
    this.categoryElem.addChildren(this.categoryLink);
    this.title.addChildren(this.titleLink);
    this.infoStock.addChildren(...this.infoStockValues);
    this.ratingElem.addChildren(this.ratingStars, this.ratingCount);
    this.info.addChildren(this.ratingElem, this.infoStock);
    this.dots.addChildren(this.dot1.elem, this.dot2.elem, this.dot3.elem);
    // this.image.addChildren(this.img);
    this.addChildren(
      this.image.elem,
      this.dots.elem,
      this.info.elem,
      this.title.elem,
      this.categoryElem.elem,
      this.priceElem.elem,
      this.order.elem,
    );
    console.log(this.slider);
  }
}
