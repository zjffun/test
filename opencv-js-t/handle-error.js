/**
 * 没有找到更好的方式去处理
 *
 * 只能把
 * throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."
 * 改成
 * console.error("abort("+what+"). Build with -s ASSERTIONS=1 for more info.")
 */

process.on("unhandledRejection", (err) => {
  debugger;
  // 捕捉到了，但是 cv 的监听依旧触发。
  // 所以提前结束比较好
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  debugger;
});

let cv;
try {
  cv = require("./opencv.js");
} catch (error) {
  debugger;
}

async function main() {
  Promise.resolve().then((d) => {
    debugger;
    throw Error("err");
  });
}

try {
  cv.onRuntimeInitialized = async () => {
    try {
      await main();
    } catch (error) {
      debugger;
    }
  };
} catch (error) {
  debugger;
}
