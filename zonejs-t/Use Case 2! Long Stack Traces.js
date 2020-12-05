require("zone.js/dist/zone-node");

function cleanTrace(trace) {
  const reg = /node_modules|internal|LongStackTraceZoneSpec\.onScheduleTask/;
  return trace
    .split("\n")
    .filter((t) => !reg.test(t))
    .join("\n");
}

class LongStackTraceZoneSpec {
  constructor() {
    this.name = "LongStackTrace";
  }

  onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
    var task = parentZoneDelegate.scheduleTask(targetZone, task);
    // Every time a new task is created we capture a stack trace
    // of the location where it was created.
    task.data.trace = new Error("LongStackTrace");
    // Pair the new task with the parent task which created it.
    task.data.parentTask = Zone.currentTask;
    return task;
  }

  onHandleError(parentZD, current, target, error) {
    error.stack = cleanTrace(error.stack) + this.getLongStackTrace();
    return parentZD.handleError(target, error);
  }

  // assemble a long stack trace
  getLongStackTrace() {
    var trace = [""];
    var task = Zone.currentTask;
    while (task) {
      trace.push(cleanTrace(task.data.trace.stack));
      task = task.data.parentTask;
    }
    return trace.join("\n--- async gap --\n");
  }
}

let lst;

function test(fn) {
  return function (done) {
    Zone.current.fork((lst = new LongStackTraceZoneSpec(done))).run(fn);
  };
}

test(() => {
  setTimeout(() => {
    setTimeout(() => {
      Promise.resolve(0).then(() => {
        console.log(lst.getLongStackTrace());
        throw Error("aa");
        debugger;
      });
    }, 1000);
  }, 0);
})(() => {
  console.log("done");
});
