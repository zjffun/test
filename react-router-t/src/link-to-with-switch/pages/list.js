import * as React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation,
} from "react-router-dom";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";

const List = (...args) => {
  const location = useLocation();
  console.log("list", args, location);
  return (
    <>
      <p>list</p>
      <Router basename="/list">
        <Switch>
          <Route
            path="/test1"
            children={() => {
              debugger;
              return <Test1 />;
            }}
          />
          <Route
            path="/test2"
            children={() => {
              debugger;
              return <Test2 />;
            }}
          />
          <Route
            children={() => {
              debugger;
              return <Test3 />;
            }}
          />
        </Switch>
      </Router>
    </>
  );
};

export default List;
