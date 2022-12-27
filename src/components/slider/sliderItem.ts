import { BaseComponent } from '@/services/BaseComponent';
import { Slider } from './Slider';

export class SliderItem extends BaseComponent {
  wrapper;

  dots;

  sliderItem1;

  sliderItem2;

  sliderItem3;

  constructor(id:string) {
    super({
      tag: 'div',
      className: 'slider',
      attributes: {
        id,
      },
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'slider__wrapper',
    });

    this.sliderItem1 = new BaseComponent({
      tag: 'div',
      className: 'slider__item',
    });
    this.sliderItem2 = new BaseComponent({
      tag: 'div',
      className: 'slider__item',
    });
    this.sliderItem3 = new BaseComponent({
      tag: 'div',
      className: 'slider__item',
    });
    this.dots = new BaseComponent({
      tag: 'div',
      className: 'slider__dots',
    });
  }

  render() {
    this.wrapper.addChildren(this.sliderItem1.elem, this.sliderItem2.elem, this.sliderItem3.elem);
    this.addChildren(this.wrapper.elem, this.dots.elem);
    window.addEventListener('load', () => {
      new Slider(this.elem);
    });
  }
}
