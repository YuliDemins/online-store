import { BaseComponent } from '@/services/BaseComponent';

export class ProductDetails extends BaseComponent {
  productDetailsDescr: BaseComponent;

  productDetailsStock: BaseComponent;

  productDetailsBrand: BaseComponent;

  productDetailsRating: BaseComponent;

  productDetailsCategory: BaseComponent;

  productDetailsDiscount: BaseComponent;

  constructor() {
    super({
      className: 'product-page__details',
    });

    this.productDetailsDescr = new BaseComponent({
      className: 'product-page__details-descr',
      textContent: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiatest culpa et culpa duis.',
    });

    this.productDetailsDiscount = new BaseComponent({
      className: 'product-page__details-discount',
      textContent: 'discount',
    });

    this.productDetailsRating = new BaseComponent({
      className: 'product-page__details-rating',
      textContent: 'rating',
    });

    this.productDetailsStock = new BaseComponent({
      className: 'product-page__details-stock',
      textContent: 'stock',
    });

    this.productDetailsBrand = new BaseComponent({
      className: 'product-page__details-brand',
      textContent: 'brand',
    });

    this.productDetailsCategory = new BaseComponent({
      className: 'product-page__details-category',
      textContent: 'category',
    });
  }

  render() {
    this.addChildren(
      this.productDetailsDescr,
      this.productDetailsDiscount,
      this.productDetailsRating,
      this.productDetailsStock,
      this.productDetailsBrand,
      this.productDetailsCategory,
    );
  }
}
