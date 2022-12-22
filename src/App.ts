import { AppRoute } from './enums/routes';
import { Router } from './services/Router';
import { Header } from './components/header/header';
import { createElement } from './utils';

export class App {
  root: HTMLElement | null;

  main: HTMLElement | null;

  constructor() {
    this.root = document.getElementById('root');
    this.main = createElement('main', 'main');

    this.root?.append(this.main);
  }

  start() {
    const head: Header = new Header();
    console.log(head);

    if (this.root) {
      this.createRouter();
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
            if (this.main) {
              this.main.innerHTML = '';
              this.main.appendChild(component);
            }
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
