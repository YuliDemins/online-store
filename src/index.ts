import './index.scss';

import {Header} from './components/header/header';
import {MainPage} from './components/main_page/main_page.js';
import {Footer} from './components/footer/footer';

import {getProducts} from './components/products.js';

// import {getProducts} from './components/products';

const header:Header = new Header();
const mainPage = new MainPage();
const footer:Footer = new Footer();
getProducts();
console.log(header, mainPage, footer);
