import { BaseComponent } from '@/services/BaseComponent';
import { ErrorModalField } from './errorField';

export class Modal extends BaseComponent {
  modalInner: BaseComponent;

  modalInputs: BaseComponent;

  modalPhoneInput: BaseComponent;

  modalDeliveryInput: BaseComponent;

  modalNameInput: BaseComponent;

  modalEmailInput: BaseComponent;

  modalCard: BaseComponent;

  modalCardNumber: BaseComponent;

  modalCardNumberImg: BaseComponent;

  modalCardNumberInput: BaseComponent;

  modalCardValidInput: BaseComponent;

  modalCardCvvInput: BaseComponent;

  confirmBtn: BaseComponent;

  modalName: BaseComponent;

  modalPhone: BaseComponent;

  modalDelivery: BaseComponent;

  modalEmail: BaseComponent;

  modalCardCvv: BaseComponent;

  modalCardValid: BaseComponent;

  errors: ErrorModalField[];

  constructor() {
    super({
      className: ['modal', 'hide'],
    });

    this.modalInner = new BaseComponent({
      className: 'modal__inner',
    });

    this.modalInputs = new BaseComponent({
      className: 'modal__inputs',
    });

    this.modalName = new BaseComponent({
      className: 'modal__name',
    });

    this.modalNameInput = new BaseComponent({
      tag: 'input',
      className: 'modal__name-input',
      attributes: {
        type: 'text',
        placeholder: 'Name',
      },
    });

    this.modalPhone = new BaseComponent({
      className: 'modal__phone',
    });

    this.modalPhoneInput = new BaseComponent({
      tag: 'input',
      className: 'modal__phone-input',
      attributes: {
        type: 'text',
        placeholder: 'Phone Number',
      },
    });

    this.modalDelivery = new BaseComponent({
      className: 'modal__delivery',
    });

    this.modalDeliveryInput = new BaseComponent({
      tag: 'input',
      className: 'modal__delivery-input',
      attributes: {
        type: 'text',
        placeholder: 'Delivery address',
      },
    });

    this.modalEmail = new BaseComponent({
      className: 'modal__email',
    });

    this.modalEmailInput = new BaseComponent({
      tag: 'input',
      className: 'modal__email-input',
      attributes: {
        type: 'text',
        placeholder: 'E-mail',
      },
    });

    this.modalCard = new BaseComponent({
      className: 'modal__card',
    });

    this.modalCardNumber = new BaseComponent({
      className: 'modal__card-number',
    });

    this.modalCardNumberImg = new BaseComponent({
      tag: 'img',
      className: 'modal__card-number-img',
      attributes: {
        src: 'https://img.lovepik.com/free-png/20210919/lovepik-credit-card-png-image_400515492_wh1200.png',
        alt: 'card logo',
        width: '20',
      },
    });

    this.modalCardNumberInput = new BaseComponent({
      tag: 'input',
      className: 'modal__card-number-input',
      attributes: {
        type: 'text',
        placeholder: 'Card Number',
      },
    });

    this.modalCardValid = new BaseComponent({
      className: 'modal__card-valid',
    });

    this.modalCardValidInput = new BaseComponent({
      tag: 'input',
      className: 'modal__card-valid-input',
      attributes: {
        type: 'text',
        placeholder: 'Valid Thru',
      },
    });

    this.modalCardCvv = new BaseComponent({
      className: 'modal__card-cvv',
    });

    this.modalCardCvvInput = new BaseComponent({
      tag: 'input',
      className: 'modal__card-cvv-input',
      attributes: {
        type: 'text',
        placeholder: 'CVV',
      },
    });

    this.confirmBtn = new BaseComponent({
      tag: 'button',
      className: 'modal__confirm-btn',
      textContent: 'CONFIRM',
    });

    this.errors = [];

    this.closeOnOverlay();
    this.validateNameInput();
    this.onSubmit();
  }

  render() {
    this.modalName.addChildren(this.modalNameInput);
    this.modalPhone.addChildren(this.modalPhoneInput);
    this.modalDelivery.addChildren(this.modalDeliveryInput);
    this.modalEmail.addChildren(this.modalEmailInput);
    this.modalCardValid.addChildren(this.modalCardValidInput);
    this.modalCardCvv.addChildren(this.modalCardCvvInput);

    this.modalInputs.addChildren(
      this.modalName,
      this.modalPhone,
      this.modalDelivery,
      this.modalEmail,
    );

    this.modalCardNumber.addChildren(this.modalCardNumberImg.elem, this.modalCardNumberInput.elem);
    this.modalCard.addChildren(this.modalCardNumber.elem, this.modalCardValid.elem, this.modalCardCvv.elem);

    this.modalInner.addChildren(this.modalInputs.elem, this.modalCard.elem, this.confirmBtn);
    this.addChildren(this.modalInner);
  }

  closeOnOverlay() {
    this.elem.addEventListener('click', (e) => {
      if (e.target instanceof HTMLElement) {
        if (e.target === this.elem) {
          this.elem.classList.remove('show');
          this.elem.classList.add('hide');
        }
      }
    });
  }

  validateInput(target: HTMLInputElement, regex: RegExp, modalType: BaseComponent, errMessage = 'error') {
    const error = new ErrorModalField(errMessage);
    if (!(regex.test(target.value))) {
      if (!(modalType.children.some((child) => child.elem.classList.contains('modal__error')))) {
        modalType.addChildren(error);
        this.errors.push(error);
      }
    } else {
      modalType.children.forEach((elem) => {
        if (elem.elem.classList.contains('modal__error')) {
          elem.destroy();
          modalType.children.splice(modalType.children.indexOf(elem), 1);
          this.errors.pop();
        }
      });
    }
  }

  validateNameInput() {
    this.modalNameInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(target, /^\S{3,} \S{3,}$/, this.modalName);
    });

    this.modalPhoneInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(target, /^\+[0-9]{9,}$/, this.modalPhone);
    });

    this.modalDeliveryInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(target, /^\S{5,} \S{5,} \S{5,}$/, this.modalDelivery);
    });

    this.modalEmailInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(
        target,
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        this.modalEmail,
      );
    });

    this.modalCardNumberInput.elem.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (/\D/.test(target.value) || target.value.length > 16) {
        target.value = target.value.slice(0, target.value.length - 1);
      }

      if (target.value.slice(0, 1) === '3') {
        this.modalCardNumberImg.elem.setAttribute(
          'src',
          'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg',
        );
      } else if (target.value.slice(0, 1) === '4') {
        this.modalCardNumberImg.elem.setAttribute(
          'src',
          'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png',
        );
      } else if (target.value.slice(0, 1) === '5') {
        this.modalCardNumberImg.elem.setAttribute(
          'src',
          'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg',
        );
      } else {
        this.modalCardNumberImg.elem.setAttribute(
          'src',
          'https://img.lovepik.com/free-png/20210919/lovepik-credit-card-png-image_400515492_wh1200.png',
        );
      }
    });

    this.modalCardNumberInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(target, /^\d{16,}$/, this.modalCardNumber, 'error in card number');
    });

    this.modalCardCvvInput.elem.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (/\D/.test(target.value) || target.value.length > 3) {
        target.value = target.value.slice(0, target.value.length - 1);
      }
    });

    this.modalCardCvvInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(target, /^\d{3,}$/, this.modalCardCvv, 'error in CVV');
    });

    this.modalCardValidInput.elem.addEventListener('keypress', () => {
      const input = this.modalCardValidInput.elem as HTMLInputElement;
      input.setAttribute('oldVal', input.value);
    });

    this.modalCardValidInput.elem.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;

      if (/\D/.test(target.value.replace('/', '')) || target.value.replace('/', '').length > 4) {
        target.value = target.value.slice(0, target.value.length - 1);
      }

      if (target.value.length === 2 && target.getAttribute('oldVal')?.length === 1) {
        target.value = target.value.replace('/', '');
        target.value += '/';
      }
    });

    this.modalCardValidInput.elem.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      this.validateInput(target, /^(0[0-9]|1[0-2])\/(\d\d)$/, this.modalCardValid, 'not valid Date');
    });
  }

  onSubmit() {
    this.confirmBtn.elem.addEventListener('click', () => {
      this.validateInput(this.modalNameInput.elem as HTMLInputElement, /^\S{3,} \S{3,}$/, this.modalName); // validate Name
      this.validateInput(this.modalPhoneInput.elem as HTMLInputElement, /^\+[0-9]{9,}$/, this.modalPhone); // validate Phone Number
      this.validateInput(this.modalDeliveryInput.elem as HTMLInputElement, /^\S{5,} \S{5,} \S{5,}$/, this.modalDelivery); // validate Delivery

      this.validateInput(
        this.modalEmailInput.elem as HTMLInputElement,
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        this.modalEmail,
      ); // validate email address

      this.validateInput(this.modalCardNumberInput.elem as HTMLInputElement, /^\d{16,}$/, this.modalCardNumber, 'error in card number'); // validate card number
      this.validateInput(this.modalCardValidInput.elem as HTMLInputElement, /^(0[0-9]|1[0-2])\/(\d\d)$/, this.modalCardValid, 'not valid Date'); // validate card
      this.validateInput(this.modalCardCvvInput.elem as HTMLInputElement, /^\d{3,}$/, this.modalCardCvv, 'error in CVV'); // validate Cvv

      if (this.errors.length === 0) {
        this.modalInner.elem.textContent = 'Thanks for your order. Redirect to the store';
        setTimeout(() => {
          window.localStorage.clear();
          window.location.hash = '#main';
          window.location.reload();
        }, 3000);
      }
    });
  }
}
