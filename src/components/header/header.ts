// import { root } from "../../index";
import { createElement } from '../../utils';

export class Header {
  header: HTMLElement;

  wrapper: HTMLElement;

  title: HTMLElement;

  root: HTMLElement | null;

  constructor() {
    this.header = createElement('div', 'header');
    this.wrapper = createElement('div', 'wrapper');
    this.title = createElement('h1', 'title', 'Store');
    this.wrapper.append(this.title);
    this.header.append(this.wrapper);

    this.root = document.getElementById('root');
    this.root?.append(this.header);
  }
}

// let head = new Header()
// console.log(head)
