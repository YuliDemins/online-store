import { ProductCardCounter } from '../products/productCardCounter';

export class OrderCounter extends ProductCardCounter {
  constructor(limit: number) {
    super(limit);
  }

  onCountChange(callback: () => void) {
    this.counterDec.elem.addEventListener('click', callback);
    this.counterInc.elem.addEventListener('click', callback);
  }
}
