import { BaseComponent } from '@/services/BaseComponent';

export class ProductCard extends BaseComponent {
  image;

  link;

  dots;

  dot1;

  dot2;

  dot3;

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

  constructor() {
    super({
      tag: 'div',
      className: 'proposals__list-item',
    });

    this.image = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-image',
    });

    this.link = new BaseComponent({
      tag: 'a',
      className: 'proposals__list-item-link',
      attributes: {
        href: '#',
      },
    });

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
    this.link.addChildren(this.image);
    this.order.addChildren(this.counter, this.btnCardPlus);
    this.counter.addChildren(this.counterDec, this.count, this.counterInc);
    this.priceLink.addChildren(this.priceSpan);
    this.price.addChildren(this.priceLink);
    this.category.addChildren(this.categoryLink);
    this.title.addChildren(this.titleLink);
    this.infoStock.addChildren(this.infoStock1, this.infoStock2, this.infoStock3, this.infoStock4, this.infoStock5);
    this.rating.addChildren(this.ratingStars, this.ratingCount);
    this.info.addChildren(this.rating, this.infoStock);
    this.dots.addChildren(this.dot1.elem, this.dot2.elem, this.dot3.elem);
    // this.image.addChildren(this.img);
    this.addChildren(
      this.link.elem,
      this.dots.elem,
      this.info.elem,
      this.title.elem,
      this.category.elem,
      this.price.elem,
      this.order.elem,
    );
  }
}
