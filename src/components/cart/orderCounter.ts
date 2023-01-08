import { IProductData } from '@/types/interfaces/product';
import { ProductCardCounter } from '../products/productCardCounter';

export class OrderCounter extends ProductCardCounter {
  constructor(limit: number) {
    super(limit);
  }

  onCountChange(callback: () => void, id: number) {
    this.counterDec.elem.addEventListener('click', () => {
      if (this.count.elem.getAttribute('oldvalue') === '1' && this.count.elem.getAttribute('value') === '1') {
        let arr = JSON.parse(window.localStorage.getItem('productsList') ?? '[]');
        arr = arr.filter((item: IProductData) => item.id !== id);
        window.localStorage.setItem('productsList', JSON.stringify(arr));
      }
      callback();
    });

    this.counterInc.elem.addEventListener('click', callback);
  }
}
