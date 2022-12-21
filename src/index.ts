import './index.scss';
import './assets/svg/star.svg';
import './assets/svg/card-order.svg';

import {Header} from './components/header/header';
import {Footer} from './components/footer/footer';

const header:Header = new Header();
const footer:Footer = new Footer();
console.log(header, footer);
