import * as React from "react";
import { Link, useHistory } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="index">
      <div className="header">
        <ul className="menu">
          <li>
            <Link to={"/"}>home</Link>
          </li>
          <li>
            <Link to={"/list"}>list</Link>
          </li>
          <li>
            <Link to={"/list/test1"}>list-test1</Link>
          </li>
          <li>
            <Link to={"/list/test2"}>list-test2</Link>
          </li>
        </ul>
      </div>
      <div style={{ padding: "0 50px" }}>{children}</div>
    </div>
  );
};

export default Layout;
