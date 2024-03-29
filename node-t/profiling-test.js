// chrome provide profiler devtool
// profiler devtool !== performance devtool
// performance measure not show in profiler devtool
const { performance } = require("perf_hooks");

const arr = new Array(1000).map((d, i) => i);
const arr2 = [];

let i = 0;

function profilingTest() {
  if (i++ > 30) {
    process.exit();
  }
  console.log("start");
  performance.mark("example-start");
  for (const a of arr) {
    for (const b of arr) {
      arr2.push(a * b);
    }
  }
  performance.mark("example-end");
  performance.measure("example-measure", "example-start", "example-end");
  console.log("end");
}

setInterval(profilingTest, 1000);
