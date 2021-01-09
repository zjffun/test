import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./basename/App";
import FirstExampleBasicRouting from "./1stExampleBasicRouting";
import SecondExampleNestedRouting from "./2ndExampleNestedRouting";
import LinkToWithSwitchRouters from "./link-to-with-switch/routers";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <FirstExampleBasicRouting></FirstExampleBasicRouting> */}
    {/* <SecondExampleNestedRouting></SecondExampleNestedRouting> */}
    <LinkToWithSwitchRouters></LinkToWithSwitchRouters>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
