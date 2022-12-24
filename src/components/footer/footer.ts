import { BaseComponent } from '@/services/BaseComponent';

export class Footer extends BaseComponent {
  private wrapper;

  private footerContacts;

  private footerContacts1;

  private footerContacts2;

  private footerCopyright;

  private footerCopyright1;

  private footerCopyright2;

  constructor() {
    super({
      tag: 'footer',
      className: 'footer',
    });

    this.wrapper = new BaseComponent({
      tag: 'div',
      className: 'footer__wrapper',
    });

    this.footerContacts = new BaseComponent({
      tag: 'div',
      className: 'footer__contacts',
    });

    this.footerContacts1 = new BaseComponent({
      tag: 'a',
      className: 'footer__contacts1',
      textContent: '@YuliDemins',
      attributes: {
        href: 'https://github.com/YuliDemins',
      },
    });

    this.footerContacts2 = new BaseComponent({
      tag: 'a',
      className: 'footer__contacts2',
      textContent: '@SlikeDollar',
      attributes: {
        href: 'https://github.com/SlikeDollar',
      },
    });

    this.footerCopyright = new BaseComponent({
      tag: 'div',
      className: 'footer__copyright',
    });

    this.footerCopyright1 = new BaseComponent({
      tag: 'div',
      className: 'footer__copyright1',
      textContent: '2022',
    });

    this.footerCopyright2 = new BaseComponent({
      tag: 'a',
      className: 'footer__copyright2',
      textContent: 'RsSchool',
      attributes: {
        href: 'https://rs.school/js/',
      },
    });
  }

  render() {
    this.footerContacts.addChildren(this.footerContacts1.elem, this.footerContacts2.elem);
    this.footerCopyright.addChildren(this.footerCopyright1.elem, this.footerCopyright2.elem);
    this.wrapper.addChildren(this.footerContacts.elem, this.footerCopyright.elem);
    this.addChildren(this.wrapper.elem);
  }
}
