import { AppRoute } from '@/enums/routes';

export interface Route {
  name: AppRoute;
  component: () => Promise<HTMLElement>;
}

export interface IBaseComponent {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  textContent?: string;
  attributes?: any
  // {
  //   [key: string]: string;
  // };
}
