import * as React from "react";
import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Layout from "./layout";

const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/home"));
const List = lazy(() => import(/* webpackChunkName: 'list' */ "./pages/list"));

const routers = [
  {
    path: "/",
    exact: true,
    component: Home,
    layout: Layout,
  },
  {
    path: "/list",
    component: List,
    layout: Layout,
  },
];

export default function Routers() {
  return (
    <Router basename="/">
      <Suspense fallback={<div></div>}>
        <Switch>
          {routers.map((route, i) => (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) => {
                if (route.layout) {
                  return (
                    <route.layout>
                      <route.component {...props} route={route} />
                    </route.layout>
                  );
                }

                return <route.component {...props} route={route} />;
              }}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
}
