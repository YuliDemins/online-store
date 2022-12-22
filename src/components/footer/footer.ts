import { createElement } from '../../utils';

export class Footer {
  footer: HTMLElement;

  wrapper: HTMLElement;

  footerNames: HTMLElement;

  footerNames1: HTMLElement;

  footerNames2: HTMLElement;

  footerCopy: HTMLElement;

  footerCopy1: HTMLElement;

  footerCopy2: HTMLElement;

  root: HTMLElement | null;

  constructor() {
    this.footer = createElement('footer', 'footer');
    this.wrapper = createElement('div', 'wrapper');
    this.footerNames = createElement('div', 'footer-names');

    this.footerNames1 = createElement('div', 'footer-names1', '@YuliDemins');
    this.footerNames2 = createElement('div', 'footer-names2', '@SlikeDollar');

    this.footerCopy = createElement('div', 'footer-copy');
    this.footerCopy1 = createElement('div', 'footer-copy1', '2022');
    this.footerCopy2 = createElement('div', 'footer-copy2', 'RsSchool');

    this.footerCopy.append(this.footerCopy1, this.footerCopy2);
    this.footerNames.append(this.footerNames1, this.footerNames2);
    this.wrapper.append(this.footerNames, this.footerCopy);
    this.footer.append(this.wrapper);

    this.root = document.getElementById('root');
    this.root?.append(this.footer);
  }
}
