import { IBaseComponent } from '../interfaces/interfaces';

export class BaseComponent {
  protected element: HTMLElement;

  private _children: BaseComponent[] = [];

  constructor({ tag = 'div', className = '', textContent = '', attributes }: IBaseComponent) {
    this.element = document.createElement(tag);
    if (Array.isArray(className)) {
      this.element.classList.add(...className);
    } else {
      this.element.className = className;
    }
    this.element.textContent = textContent;
    if (attributes) {
      for (const attrName in attributes) {
        if (attrName) {
          this.element.setAttribute(attrName, attributes[attrName]);
        }
      }
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
