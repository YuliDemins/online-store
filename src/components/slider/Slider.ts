import { SliderSet } from '@/interfaces/sliderset';
// import { BaseComponent } from '@/services/BaseComponent';

export class Slider {
  element;

  wrapper;

  sliderDots;

  sliderElements!: HTMLCollectionOf<HTMLElement>;

  sliderElemFirst;

  options: SliderSet;

  elemCount!: number;

  currentElement!: number;

  indicatorDotsAll!: HTMLCollectionOf<HTMLElement>;

  static defaults: SliderSet;

  constructor(element: HTMLElement) {
    this.element = element;

    [this.wrapper, this.sliderDots] = this.element.children as HTMLCollectionOf<HTMLElement>;
    if (this.wrapper.children) {
      this.sliderElements = this.wrapper.children as HTMLCollectionOf<HTMLElement>;
      [this.sliderElemFirst] = this.wrapper.children;
      // console.log(this.indicatorDots);
    }

    // Initialization
    this.options = Slider.defaults;
    Slider.initialize(this);
  }

  static initialize(item: Slider) {
    item.elemCount = item.sliderElements.length; // Количество элементов
    item.currentElement = 0;
    // Start initialization
    if (item.elemCount <= 1) { // Отключить навигацию
      item.options.dots = false;
    }
    if (item.elemCount >= 1) { // показать первый элемент
      if (item.sliderElemFirst instanceof HTMLElement) {
        item.sliderElemFirst.style.opacity = '1';
      }
    }
    if (item.options.dots) { // инициализация индикаторных точек
      let sum = '';
      let numb: number;
      for (let i = 0; i < item.elemCount; i++) {
        sum += '<span class="slider__dot"></span>';
      }
      item.sliderDots.innerHTML = sum;
      item.indicatorDotsAll = item.sliderDots.children as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < item.elemCount; i++) {
        item.indicatorDotsAll[i].addEventListener('click', () => {
          numb = Math.abs(i - item.currentElement);
          if (i < item.currentElement) {
            item.elemPrev(numb);
          } else if (i > item.currentElement) {
            item.elemNext(numb);
          }
          // }
        }, false);
      }
    }
    item.dotOff(0); // точка[0] выключена, остальные включены
    for (let i = 1; i < item.elemCount; i++) {
      item.dotOn(i);
    }
  }

  elemPrev(num:number):void {
    num = num || 1;
    if (typeof this.currentElement === 'number' && typeof this.elemCount === 'number') {
      const prevElement = this.currentElement;
      this.currentElement -= num;
      if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

      this.sliderElements[this.currentElement].style.opacity = '1';
      this.sliderElements[prevElement].style.opacity = '0';

      if (this.options.dots) {
        this.dotOn(prevElement);
        this.dotOff(this.currentElement);
      }
    }
  }

  elemNext(num:number):void {
    num = num || 1;
    if (typeof this.currentElement === 'number' && typeof this.elemCount === 'number') {
      const prevElement = this.currentElement;
      this.currentElement += num;
      if (this.currentElement >= this.elemCount) this.currentElement = 0;

      this.sliderElements[this.currentElement].style.opacity = '1';
      this.sliderElements[prevElement].style.opacity = '0';

      if (this.options.dots) {
        this.dotOn(prevElement);
        this.dotOff(this.currentElement);
      }
    }
  }

  dotOn(num:number):void {
    if (this.indicatorDotsAll && this.indicatorDotsAll[num] instanceof HTMLElement) {
      this.indicatorDotsAll[num].style.cssText = 'background-color:rgb(128, 129, 150); cursor:pointer;';
    }
  }

  dotOff(num:number):void {
    if (this.indicatorDotsAll && this.indicatorDotsAll[num] instanceof HTMLElement) {
      this.indicatorDotsAll[num].style.cssText = 'background-color:rgb(102, 204, 51); cursor:default;';
    }
  }
}
Slider.defaults = {
  loop: true, // Бесконечное зацикливание слайдера
  auto: false, // Автоматическое пролистывание
  interval: 5000, // Интервал между пролистыванием элементов (мс)
  arrows: false, // Пролистывание стрелками
  dots: true, // Индикаторные точки
};
