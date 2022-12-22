import { Route } from '@/interfaces/interfaces';

export class Router {
  constructor(
    private readonly routes: Route[],
    private onHashChange: (route?: Route) => void,
    private defaultComponent?: Route,
  ) {
    window.addEventListener('hashchange', this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }

  onHashChangeHandler() {
    const path = window.location.hash.slice(1);
    const route = this.routes.find((r) => r.name === path);
    this.onHashChange(route ?? this.defaultComponent);
  }
}
