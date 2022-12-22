import { createElement } from '@/utils';

export default class Home {
  root: HTMLElement | null;

  home: HTMLElement;

  constructor() {
    this.home = createElement('div', 'home', '');

    this.root = document.getElementById('root');
    this.root?.append(this.home);
  }
}
