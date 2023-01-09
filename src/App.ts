import { AppRoute } from './types/enums/routes';
import { Router } from './services/Router';
import { BaseComponent } from './services/BaseComponent';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Preloader } from './components/preloader/preloader';

export class App extends BaseComponent {
  header: Header;

  constructor() {
    super({
      tag: 'main',
      className: 'main',
    });

    this.header = new Header();
  }

  start() {
    const root = document.getElementById('root');

    const preloader: Preloader = new Preloader();
    preloader.render();

    this.header.render();

    const footer: Footer = new Footer();
    footer.render();

    if (root) {
      this.createRouter();
      window.location.hash = '#product';

      root.append(preloader.elem, this.header.elem, this.elem, footer.elem);
      preloader.hide();
      setTimeout(() => preloader.destroy(), 1100);
    }
  }

  createRouter() {
    return new Router(
      [
        {
          name: AppRoute.Main,
          component: async () => {
            const { Home } = await import('./components/main/Home');
            const home = new Home();
            home.render();
            return home.elem;
          },
        },
        {
          name: AppRoute.Cart,
          component: async () => {
            const { Cart } = await import('./components/cart/Cart');
            const cartPage = new Cart();
            cartPage.render();
            return cartPage.elem;
          },
        },
        {
          name: AppRoute.Product,
          component: async () => {
            const { ProductPage } = await import('./components/productPage/productPage');
            const productPage = new ProductPage();
            productPage.render();
            return productPage.elem;
          },
        },
      ],
      (route) => {
        if (route) {
          route.component().then((component) => {
            this.element.innerHTML = '';
            this.addChildren(component);
          });
        }
      },
      {
        name: AppRoute.NotFound,
        component: async () => {
          const { NotFound } = await import('./components/notFound/notFound');
          const notFoundPage = new NotFound();
          notFoundPage.render();
          return notFoundPage.elem;
        },
      },
    );
  }
}
