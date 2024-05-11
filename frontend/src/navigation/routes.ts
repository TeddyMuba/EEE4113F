import { lazy } from "react";
import { RouteProps } from "react-router";

export type PrivateRouteObject = RouteProps & {
  exact: boolean;
  path: string;
  breadcrumb: string;
  component: any;
  title: string;
};

const Home = lazy(() => import("../containers/Home"));

const PRIVATE_ROUTES: PrivateRouteObject[] = [];

const PUBLIC_ROUTES = [
  {
    exact: true,
    title: "Home",
    path: "/",
    component: Home,
  },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
