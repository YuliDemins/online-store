import { BaseComponent } from '@/services/BaseComponent';

export class ProductCard extends BaseComponent {
  image;

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

  id: number;

  name: string;

  rating: number;

  price: number;

  category: string;

  thumbnail: string;

  images: string[];

  constructor(
    id: number,
    name: string,
    rating: number,
    price: number,
    category: string,
    thumbnail: string,
    images: string[],
  ) {
    super({
      tag: 'div',
      className: 'proposals__list-item',
    });

    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.category = category;
    this.price = price;
    this.rating = rating;
    this.images = images;

    this.image = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-image',
      attributes: {
        style: `background-image: url(${this.thumbnail}`,
      },
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
    this.order.addChildren(this.counter, this.btnCardPlus);
    this.counter.addChildren(this.counterDec, this.count, this.counterInc);
    this.priceLink.addChildren(this.priceSpan);
    this.priceElem.addChildren(this.priceLink);
    this.categoryElem.addChildren(this.categoryLink);
    this.title.addChildren(this.titleLink);
    this.infoStock.addChildren(...this.infoStockValues);
    this.ratingElem.addChildren(this.ratingStars, this.ratingCount);
    this.info.addChildren(this.ratingElem, this.infoStock);
    this.addChildren(
      this.image.elem,
      this.info.elem,
      this.title.elem,
      this.categoryElem.elem,
      this.priceElem.elem,
      this.order.elem,
    );
  }
}
