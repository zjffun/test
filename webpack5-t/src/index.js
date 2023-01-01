import foo1 from "./state.js";
import foo2 from "@/state.js";

import "./alias/test.js";

console.log(foo1);
console.log(foo2);

console.log(foo1 === foo2);
