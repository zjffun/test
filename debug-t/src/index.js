import * as pkg1 from "debug-t-pkg1";
import * as component from "./component.js";

debugger;

// packages/pkg1/index.js.map not used
const foo1 = pkg1.foo(1);

console.log(foo1);

const bar = () => {
  console.log("bar");
};

component.foo(1);
