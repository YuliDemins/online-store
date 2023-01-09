import { BaseComponent } from '@/services/BaseComponent';
import { SliderItem } from '../slider/sliderItem';
import { ProductPageCart } from './productCart';
import { ProductDetails } from './productDetails';

export class ProductPage extends BaseComponent {
  breadCrumbs: BaseComponent;

  productTitle: BaseComponent;

  productPageInner: BaseComponent;

  productPageDetails: ProductDetails;

  productPageCart: ProductPageCart;

  constructor() {
    super({
      tag: 'div',
      className: 'product-page',
    });

    this.breadCrumbs = new BaseComponent({
      className: 'product-page__breadcrumbs',
      textContent: 'store >> laptop >> apple >> macbook',
    });

    this.productTitle = new BaseComponent({
      tag: 'h1',
      className: 'product__title',
      textContent: 'TITLE',
    });

    this.productPageInner = new BaseComponent({
      className: 'product-page__inner',
    });

    this.productPageDetails = new ProductDetails();
    this.productPageDetails.render();

    this.productPageCart = new ProductPageCart();
    this.productPageCart.render();
  }

  async render() {
    const images = await this.checkImages() as string[];
    const slider = new SliderItem(0, images);
    slider.render();
    this.productPageInner.addChildren(slider, this.productPageDetails, this.productPageCart);
    this.addChildren(this.breadCrumbs, this.productTitle, this.productPageInner);
  }

  async updateInfo() {
    const id = new URLSearchParams(document.location.search).get('productId');
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();

    this.productTitle.elem.textContent = `${data.title}`;

    this.breadCrumbs.elem.textContent = `store >> ${data.category} >> ${data.brand} >> ${data.title}`;

    this.productPageDetails.productDetailsDescr.elem.textContent = `Description - ${data.description}`;
    this.productPageDetails.productDetailsDiscount.elem.textContent = `Discount - ${data.discountPercentage}%`;
    this.productPageDetails.productDetailsRating.elem.textContent = `Rating - ${data.rating} stars`;
    this.productPageDetails.productDetailsStock.elem.textContent = `Stock - ${data.stock}`;
    this.productPageDetails.productDetailsBrand.elem.textContent = `Brand - ${data.brand}`;
    this.productPageDetails.productDetailsCategory.elem.textContent = `Category - ${data.category}`;

    this.productPageCart.cartSectionPrice.elem.textContent = `${data.price}$`;
    return data;
  }

  async checkImages() {
    const slider = await this.updateInfo();
    const array:unknown[] = [];

    slider.images.map(async (url: string) => {
      const base64data = await this.imageUrlToBase64(url);
      array.push(base64data);
      return base64data;
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        const set = [...new Set(array)] as string[];
        resolve(set);
      }, 1500);
    });
  }

  async imageUrlToBase64(url: string) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }
}
