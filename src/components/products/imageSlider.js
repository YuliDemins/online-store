import { Swiper, Navigation, Pagination } from 'swiper';

export class ImageSlider {
  constructor() {
    const swiper = document.getElementsByName('.swiper');
    this.swiper = new Swiper(
      '.swiper',
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
    // @ts-ignore
    swiper.nextSlide();
  }
}
