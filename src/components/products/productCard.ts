import { app } from '@/index';
import { IProduct, IProductData } from '@/types/interfaces/product';
import { BaseComponent } from '@/services/BaseComponent';
import { ProductCardOrder } from './productCardOrder';

export class ProductCard extends BaseComponent {
  image;

  info;

  ratingElem;

  ratingStars;

  ratingCount;

  // infoStockValues: BaseComponent[];

  infoStock;

  title;

  titleLink;

  categoryLink;

  categoryElem;

  priceElem;

  priceLink;

  priceSpan;

  Order: ProductCardOrder;

  id: number;

  name: string;

  rating: number;

  price: number;

  category: string;

  thumbnail: string;

  images: string[];

  stock: number;

  brand: string;

  description: string;

  discountPercentage: number;

  productData: IProductData;

  infoStockImage: BaseComponent;

  infoStockValue: BaseComponent;

  constructor(
    id: number,
    name: string,
    rating: number,
    price: number,
    category: string,
    thumbnail: string,
    images: string[],
    stock: number,
    brand: string,
    description: string,
    discountPercentage: number,
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
    this.stock = stock;
    this.brand = brand;
    this.description = description;
    this.discountPercentage = discountPercentage;

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
      attributes: {
        'data-tooltip': 'Rating',
      },
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

    this.infoStockImage = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stock-image',
      attributes: {
        'data-tooltip': 'Stock',
      },
    });

    this.infoStockValue = new BaseComponent({
      tag: 'div',
      className: 'proposals__list-item-stock-value',
      textContent: `${this.stock}`,
    });

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

    this.Order = new ProductCardOrder(this.stock);
    this.Order.render();
    this.Order.addProduct(this.storeCard.bind(this));

    this.productData = {
      id: this.id,
      title: this.name,
      rating: this.rating,
      price: this.price,
      category: this.category,
      thumbnail: this.thumbnail,
      images: this.images,
      stock: this.stock,
      brand: this.brand,
      description: this.description,
      discountPercentage: this.discountPercentage,
      amount: 1,
    };
  }

  render() {
    this.priceLink.addChildren(this.priceSpan);
    this.priceElem.addChildren(this.priceLink);
    this.categoryElem.addChildren(this.categoryLink);
    this.title.addChildren(this.titleLink);
    this.infoStock.addChildren(this.infoStockImage.elem, this.infoStockValue.elem);
    this.ratingElem.addChildren(this.ratingStars, this.ratingCount);
    this.info.addChildren(this.ratingElem, this.infoStock);
    this.addChildren(
      this.image.elem,
      this.info.elem,
      this.title.elem,
      this.categoryElem.elem,
      this.priceElem.elem,
      this.Order,
    );
  }

  storeCard() {
    const arr = JSON.parse(window.localStorage.getItem('productsList') ?? '[]');
    const findIndex = arr.findIndex((obj: IProduct) => obj.id === this.productData.id);

    if (this.Order.Counter.count.elem instanceof HTMLInputElement) {
      const val = this.Order.Counter.count.elem.getAttribute('value');
      if (val) this.productData.amount = +val;
    }

    if (findIndex !== -1) {
      arr[findIndex].amount += +this.productData.amount;
    } else {
      arr.push(this.productData);
    }

    window.localStorage.setItem('productsList', JSON.stringify(arr));
    app.header.Cart.updateCartNum();
    app.header.updateTotal();
  }
}
