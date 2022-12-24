import { AppRoute } from './enums/routes';
import { Router } from './services/Router';
import { Header } from './components/header/header';
import { BaseComponent } from './services/BaseComponent';
import { Footer } from './components/footer/footer';
import { Preloader } from './components/preloader/preloader';
import Home from './components/main/Home';

export class App extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: 'main',
    });
  }

  start() {
    const root = document.getElementById('root');

    const preloader:Preloader = new Preloader();
    preloader.render();
    // preloader.hide();

    const header: Header = new Header();
    header.render();

    const home: Home = new Home();
    home.render();

    const footer:Footer = new Footer();
    footer.render();

    if (root) {
      // this.createRouter();
      root.append(preloader.elem, header.elem, home.elem, this.elem, footer.elem);
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
        name: AppRoute.Default,
        component: async () => {
          const { Home } = await import('./components/main/Home');
          const home = new Home();
          home.render();
          return home.elem;
        },
      },
    );
  }
}
