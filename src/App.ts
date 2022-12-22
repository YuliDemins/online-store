import { AppRoute } from './enums/routes';
import { Router } from './services/Router';
import { Header } from './components/header/header';
import { BaseComponent } from './services/BaseComponent';

export class App extends BaseComponent {
  constructor() {
    super({
      tag: 'main',
      className: 'main',
    });
  }

  start() {
    const root = document.getElementById('root');
    const head: Header = new Header();
    head.render();

    if (root) {
      this.createRouter();
      root.append(head.elem, this.elem);
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
