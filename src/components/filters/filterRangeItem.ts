import { BaseComponent } from '@/services/BaseComponent';

export class FilterRangeItem extends BaseComponent {
  minmaxWrapper: BaseComponent;

  minLabel: BaseComponent;

  minInput: BaseComponent;

  maxLabel: BaseComponent;

  maxInput: BaseComponent;

  protected initialValue: BaseComponent;

  protected finalValue: BaseComponent;

  legend: BaseComponent;

  protected thumbSize: number;

  protected rangeMin: number;

  protected rangeWidth: number;

  protected rangeMax: number;

  protected averageValue: number;

  protected legendNum: string;

  constructor() {
    super({
      tag: 'div',
      className: 'filter-category-range',
    });

    this.minmaxWrapper = new BaseComponent({
      tag: 'div',
      className: 'filter-category-range_wrapper',
    });

    this.minLabel = new BaseComponent({
      tag: 'label',
      className: 'filter-category-range_label',
      textContent: 'Minimum price',
      attributes: {
        for: 'min',
      },
    });
    this.minInput = new BaseComponent({
      tag: 'input',
      className: 'min',
      attributes: {
        type: 'range',
        name: 'min',
        min: '0',
        max: '1000',
        step: '1',
        id: 'min',
        value: '0',
      },
    });
    this.maxLabel = new BaseComponent({
      tag: 'label',
      className: 'filter-category-range_label',
      textContent: 'Max price',
      attributes: {
        for: 'max',
      },
    });
    this.maxInput = new BaseComponent({
      tag: 'input',
      className: 'max',
      attributes: {
        type: 'range',
        name: 'max',
        min: '1000',
        max: '2000',
        step: '1',
        id: 'max',
        value: '2000',
      },
    });

    this.initialValue = new BaseComponent({
      tag: 'span',
      className: 'filter-category-range_initial',
      textContent: '0',
    });
    this.finalValue = new BaseComponent({
      tag: 'span',
      className: 'filter-category-range_final',
      textContent: '2000',
    });

    this.legend = new BaseComponent({
      tag: 'span',
      className: 'filter-category-range_legend',
    });

    window.addEventListener('load', () => this.init(this.minmaxWrapper.elem));

    this.initialValue.elem.innerHTML = this.minInput.elem.getAttribute('data-value')!;
    this.finalValue.elem.innerHTML = this.maxInput.elem.getAttribute('data-value')!;

    this.thumbSize = parseInt(this.minmaxWrapper.elem.getAttribute('data-thumbsize')!, 10);
    this.rangeWidth = this.minmaxWrapper.elem.offsetWidth;

    this.rangeMin = parseInt(this.minInput.elem.getAttribute('min')!, 10);

    this.rangeMax = parseInt(this.maxInput.elem.getAttribute('max')!, 10);
    this.legendNum = this.minmaxWrapper.elem.getAttribute('data-legendnum')!;
    this.averageValue = (this.rangeMin + this.rangeMax) / 2;
  }

  render() {
    this.minmaxWrapper.elem.setAttribute('data-legendnum', '2');
    this.minmaxWrapper.addChildren(
      this.initialValue.elem,
      this.finalValue.elem,
      this.minLabel.elem,
      this.minInput.elem,
      this.maxLabel.elem,
      this.maxInput.elem,
      this.legend.elem,
    );
    this.addChildren(this.minmaxWrapper.elem);
  }

  draw(slider: HTMLElement, splitvalue: number) {
    /* set function vars */

    this.thumbSize = parseInt(slider.getAttribute('data-thumbsize')!, 10);
    this.rangeWidth = parseInt(slider.getAttribute('data-rangewidth')!, 10);
    this.rangeMin = parseInt(slider.getAttribute('data-rangemin')!, 10);
    this.rangeMax = parseInt(slider.getAttribute('data-rangemax')!, 10);

    /* set min and max attributes */
    this.minInput.elem.setAttribute('max', splitvalue.toString());
    this.maxInput.elem.setAttribute('min', splitvalue.toString());

    /* set css */
    this.minInput.elem.style.width = `${parseInt((this.thumbSize + ((splitvalue - this.rangeMin) /
    (this.rangeMax - this.rangeMin)) * (this.rangeWidth - (2 * this.thumbSize))).toString(), 10)}px`;

    this.maxInput.elem.style.width = `${parseInt((this.thumbSize +
    ((this.rangeMax - splitvalue) / (this.rangeMax - this.rangeMin))
     * (this.rangeWidth - (2 * this.thumbSize))).toString(), 10)}px`;

    this.minInput.elem.style.left = '0px';
    this.maxInput.elem.style.left = `${parseInt(this.minInput.elem.style.width, 10)}px`;
    this.minInput.elem.style.top = `${this.initialValue.elem.offsetHeight}px`;
    this.maxInput.elem.style.top = `${this.initialValue.elem.offsetHeight}px`;
    this.legend.elem.style.marginTop = `${this.minInput.elem.offsetHeight}px`;
    slider.style.height = `
    ${this.initialValue.elem.offsetHeight + this.minInput.elem.offsetHeight + this.legend.elem.offsetHeight}px`;
    /* correct for 1 off at the end */
    if (this.maxInput.elem instanceof HTMLInputElement) {
      if (parseInt(this.maxInput.elem.value, 10) > (this.rangeMax - 1)) {
        this.maxInput.elem.setAttribute('data-value', this.rangeMax.toString());
      }
    }

    /* write value and labels */
    if (this.maxInput.elem instanceof HTMLInputElement && this.minInput.elem instanceof HTMLInputElement) {
      this.maxInput.elem.value = this.maxInput.elem.getAttribute('data-value')!;
      this.minInput.elem.value = this.minInput.elem.getAttribute('data-value')!;
      console.log(this.minInput.elem.getAttribute('data-value'));
      this.initialValue.elem.innerHTML = this.minInput.elem.getAttribute('data-value')!;
      this.finalValue.elem.innerHTML = this.maxInput.elem.getAttribute('data-value')!;
    }
  }

  init(slider: HTMLElement) {
    /* set function vars */
    this.thumbSize = 16;
    this.rangeMin = parseInt(this.minInput.elem.getAttribute('min')!, 10);
    this.rangeMax = parseInt(this.maxInput.elem.getAttribute('max')!, 10);
    this.averageValue = (this.rangeMin + this.rangeMax) / 2;

    this.legendNum = slider.getAttribute('data-legendnum')!;

    /* set data-values */
    this.minInput.elem.setAttribute('data-value', this.rangeMin.toString());
    this.maxInput.elem.setAttribute('data-value', this.rangeMax.toString());

    /* set data vars */
    slider.setAttribute('data-rangemin', this.rangeMin.toString());
    slider.setAttribute('data-rangemax', this.rangeMax.toString());
    slider.setAttribute('data-thumbsize', this.thumbSize.toString());
    slider.setAttribute('data-rangewidth', slider.offsetWidth.toString());

    const arrLegend:HTMLElement[] = [];
    for (let i = 0; i < parseInt(this.legendNum, 10); i++) {
      const legendvalue = new BaseComponent({
        tag: 'div',
        textContent: (Math.round(this.rangeMin + (i / (parseInt(this.legendNum!, 10) - 1))
        * (this.rangeMax - this.rangeMin))).toString(),
      });
      arrLegend.push(legendvalue.elem);
      this.legend.addChildren(...arrLegend);
    }

    /* draw */
    this.draw(this.minmaxWrapper.elem, this.averageValue);

    /* events */
    this.minInput.elem.addEventListener('input', () => {
      this.update();
    });
    this.maxInput.elem.addEventListener('input', () => {
      this.update();
    });
  }

  update() {
    if (this.minInput.elem instanceof HTMLInputElement && this.maxInput.elem instanceof HTMLInputElement) {
      /* set inactive values before draw */
      this.minInput.elem.setAttribute('data-value', parseInt(this.minInput.elem.value, 10).toString());
      this.maxInput.elem.setAttribute('data-value', parseInt(this.maxInput.elem.value, 10).toString());

      /* draw */
      this.draw(this.minmaxWrapper.elem, this.averageValue);
    }
  }
}
