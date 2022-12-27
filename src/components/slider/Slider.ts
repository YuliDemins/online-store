export class Slider {
  element: HTMLElement;

  sliderList: Element;

  indicatorDots: Element;

  sliderElements: HTMLCollection;

  sliderElemFirst: HTMLElement;

  options: HTMLElement;

  static defaults: HTMLElement;

  elemCount: number | undefined;

  currentElement: number | undefined;

  indicatorDotsAll: HTMLCollection | undefined;

  constructor(element: HTMLElement) {
    this.element = element;
    [this.sliderList, this.indicatorDots] = this.element.children;
    this.sliderElements = this.sliderList.children;
    [this.sliderElemFirst] = this.sliderList.children;
    console.log(this.indicatorDots);

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
      item.sliderElemFirst.style.opacity = '1';
    }
    if (item.options.dots) { // инициализация индикаторных точек
      let sum = '';
      let numb;
      for (let i = 0; i < item.elemCount; i++) {
        sum += '<span class="slider__dot"></span>';
      }
      item.indicatorDots.innerHTML = sum;
      item.indicatorDotsAll = item.indicatorDots.children;
      for (let n = 0; n < item.elemCount; n++) {
        item.indicatorDotsAll[n].addEventListener('click', () => {
          if (typeof item.currentElement === 'number') {
            numb = Math.abs(n - item.currentElement);
            if (n < item.currentElement) {
              item.elemPrev(numb);
            } else if (n > item.currentElement) {
              item.elemNext(numb);
            }
          }
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
    this.indicatorDotsAll[num].style.cssText = 'background-color:rgb(128, 129, 150); cursor:pointer;';
  }

  dotOff(num:number):void {
    this.indicatorDotsAll[num].style.cssText = 'background-color:rgb(102, 204, 51); cursor:default;';
  }
}

Slider.defaults = {
  loop: true, // Бесконечное зацикливание слайдера
  // auto: true, // Автоматическое пролистывание
  // interval: 5000, // Интервал между пролистыванием элементов (мс)
  // arrows: true, // Пролистывание стрелками
  dots: true, // Индикаторные точки
};
