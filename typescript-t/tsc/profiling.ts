import { randomBytes } from "crypto";

let arr = [];
function doBusyWork() {
  let n = 0;
  for (let i = 0; i < 10; i++) {
    const input = randomBytes(8).toString("hex");
    arr.push(1);
  }

  return n;
}

setInterval(() => {
  const start = Date.now();
  const busyStuff = doBusyWork();
  console.log(`hello, took ${Date.now() - start}ms`);
}, 100);

setTimeout(() => {
  console.log("stop");
}, 10000);
