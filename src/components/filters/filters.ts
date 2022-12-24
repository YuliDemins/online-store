import { BaseComponent } from '@/services/BaseComponent';

export class Filters extends BaseComponent {
  categoryItem1;

  title1;

  form1;

  input1;

  span1;

  span12;

  input12;

  form12;

  span11;

  input11;

  form11;

  more1;

  moreText1;

  filterCategory;

  categoryItem2;

  title2;

  form2;

  input2;

  span2;

  form21;

  input21;

  span21;

  form22;

  span22;

  more2;

  moreText2;

  input22;

  constructor() {
    super({
      tag: 'aside',
      className: 'filter',
    });

    const brand:string[] = ['Apple', 'Samsung', 'OPPO', 'Huawei', 'Microsoft Surface', 'Infinix', 'HP Pavilion'];

    const category = ['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'];

    this.filterCategory = new BaseComponent({
      tag: 'div',
      className: 'filter-category',
    });

    this.categoryItem1 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title1 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item',
      textContent: 'Бренд',
    });

    this.form1 = new BaseComponent({
      tag: 'label',
      className: 'filter-category-form',
      textContent: brand[0],
    });

    this.input1 = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        target: '_blank',
        name: 'brand',
        value: brand[0],
      },
    });

    this.span1 = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.form11 = new BaseComponent({
      tag: 'label',
      className: 'filter-category-form',
      textContent: brand[1],
    });

    this.input11 = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        target: '_blank',
        name: 'brand',
        value: brand[1],
      },
    });

    this.span11 = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.form12 = new BaseComponent({
      tag: 'label',
      className: 'filter-category-form',
      textContent: brand[2],
    });

    this.input12 = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        target: '_blank',
        name: 'brand',
        value: brand[2],
      },
    });

    this.span12 = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.more1 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-more',
    });
    this.moreText1 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-more-text',
      textContent: 'Показать еще...',
    });

    this.categoryItem2 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-item',
    });

    this.title2 = new BaseComponent({
      tag: 'h3',
      className: 'filter-category-item',
      textContent: 'Категория',
    });

    this.form2 = new BaseComponent({
      tag: 'label',
      className: 'filter-category-form',
      textContent: category[0],
    });

    this.input2 = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        target: '_blank',
        name: 'brand',
        value: brand[0],
      },
    });

    this.span2 = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.form21 = new BaseComponent({
      tag: 'label',
      className: 'filter-category-form',
      textContent: category[1],
    });

    this.input21 = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        target: '_blank',
        name: 'brand',
        value: brand[0],
      },
    });

    this.span21 = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.form22 = new BaseComponent({
      tag: 'label',
      className: 'filter-category-form',
      textContent: category[2],
    });

    this.input22 = new BaseComponent({
      tag: 'input',
      className: 'filter-category-input',
      attributes: {
        type: 'checkbox',
        target: '_blank',
        name: 'brand',
        value: brand[0],
      },
    });

    this.span22 = new BaseComponent({
      tag: 'span',
      className: 'filter-category-span',
    });

    this.more2 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-more',
    });
    this.moreText2 = new BaseComponent({
      tag: 'div',
      className: 'filter-category-more-text',
      textContent: 'Показать еще...',
    });
  }

  render() {
    this.form22.addChildren(this.input22, this.span22);
    this.form21.addChildren(this.input21, this.span21);
    this.form2.addChildren(this.input2, this.span2);
    this.categoryItem2.addChildren(this.title2, this.form2, this.form21, this.form22, this.more2);

    this.more2.addChildren(this.moreText2);
    this.more1.addChildren(this.moreText1);
    this.form12.addChildren(this.input12, this.span12);
    this.form11.addChildren(this.input11, this.span11);
    this.form1.addChildren(this.input1, this.span1);
    this.categoryItem1.addChildren(this.title1, this.form1, this.form11, this.form12, this.more1);
    this.filterCategory.addChildren(this.categoryItem1, this.categoryItem2);
    this.addChildren(this.filterCategory.elem);
  }
}
