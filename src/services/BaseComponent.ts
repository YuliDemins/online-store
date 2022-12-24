import { IBaseComponent } from '../interfaces/interfaces';

export class BaseComponent {
  protected element: HTMLElement;

  private _children: BaseComponent[] = [];

  constructor({ tag = 'div', className = '', textContent = '',
  // attrName, attrValue = '' 
  attr
}: IBaseComponent) {
    this.element = document.createElement(tag);
    this.element.className = className;
    this.element.textContent = textContent;
    // if (attrName) {
    //   this.elem.setAttribute(attrName, attrValue);
    // }
    if (attr) {
			Object.assign(this.elem, attr);
		}
  }

  get elem() {
    return this.element;
  }

  get children() {
    return this._children;
  }

  addChildren(...elements: (HTMLElement | BaseComponent)[]) {
    elements.forEach((elem) => {
      if (elem instanceof HTMLElement) {
        this.element.append(elem);
      } else {
        this.element.append(elem.elem);
        this._children.push(elem);
      }
    });
  }

  destroy() {
    this._children.forEach((child) => child.destroy());
    this.element.remove();
  }
}
