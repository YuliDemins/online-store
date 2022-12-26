// import { ImageSlider } from './imageSlider';
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, Navigation, Pagination } from 'swiper';
import { BaseComponent } from '@/services/BaseComponent';

export class Slider extends BaseComponent {
  wrapper: BaseComponent;

  slide1: BaseComponent;

  slide2: BaseComponent;

  slide3: BaseComponent;

  pagination: BaseComponent;

  imageSlider: Swiper;

  constructor() {
    super({
      tag: 'div',
      className: ['swiper', 'my-swiper'],
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'swiper-wrapper',
    });

    this.slide1 = new BaseComponent({
      tag: 'div',
      className: 'swiper-slide',
      textContent: 'slide1',
    });

    this.slide2 = new BaseComponent({
      tag: 'div',
      className: 'swiper-slide',
    });

    this.slide3 = new BaseComponent({
      tag: 'div',
      className: 'swiper-slide',
    });

    this.pagination = new BaseComponent({
      tag: 'div',
      className: 'swiper-pagination',
    });

    this.imageSlider = new Swiper(
      '.my-swiper',
      {
        modules: [Navigation, Pagination],
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
        loop: true,
        nested: true,
      },
    );
  }

  render() {
    this.imageSlider.init();
    // console.log(this.imageSlider);
    this.wrapper.addChildren(this.slide1.elem, this.slide2.elem, this.slide3.elem);
    this.addChildren(this.wrapper.elem, this.pagination.elem);
  }
}
