import { FillLoader } from "../components";

import React, { Suspense } from "react";

import { Route, RouteProps, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import PageNotFound from "../containers/PageNotFound";

import { PUBLIC_ROUTES } from "./routes";

interface RouteType extends RouteProps {
  component: any;
}

export type NavItem = {
  to: string;
  title: string;
  icon: React.ReactNode;
  subMenu?: Array<{ to: string; title: string }>;
};

const PublicRoute = ({ component: Component, ...rest }: RouteType) => (
  <Route {...rest}>
    <Component />
  </Route>
);

const Navigation = (): JSX.Element => (
  <Router>
    <Suspense fallback={<FillLoader />}>
      <Switch>
        {PUBLIC_ROUTES.map((route) => {
          return <PublicRoute key={route.path} {...route} />;
        })}

        <Route render={PageNotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Navigation;
