import { AppRoute } from './enums/routes';
import { Router } from './services/Router';
import { Header } from './components/header/header';
import { BaseComponent } from './services/BaseComponent';
import { Footer } from './components/footer/footer';

export class App extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: 'main',
    });
  }

  start() {
    const root = document.getElementById('root');
    const header: Header = new Header();
    header.render();

    const footer:Footer = new Footer();
    footer.render();

    if (root) {
      this.createRouter();
      root.append(header.elem, this.elem, footer.elem);
    }
  }

  createRouter() {
    return new Router(
      [
        {
          name: AppRoute.Main,
          component: async () => {
            const { default: Home } = await import('./components/main/Home');
            return new Home().home;
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
          const { default: Home } = await import('./components/main/Home');
          return new Home().home;
        },
      },
    );
  }
}
