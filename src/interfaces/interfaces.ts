import { AppRoute } from '@/enums/routes';

export interface Route {
  name: AppRoute;
  component: () => Promise<HTMLElement>;
}
