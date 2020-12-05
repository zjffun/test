require("zone.js/dist/zone-node");

class VMTurnZoneSpec {
  constructor(vmTurnDone) {
    this.name = "VMTurnZone";
    this.vmTurnDone = vmTurnDone;
    this.hasMicroTask = false;
  }

  onHasTask(delegate, current, target, hasTaskState) {
    this.hasMicroTask = hasTaskState.microTask;
    if (!this.hasMicroTask) {
      this.vmTurnDone();
    }
  }

  onInvokeTask(parent, current, target, task, applyThis, applyArgs) {
    try {
      return parent.invokeTask(target, task, applyThis, applyArgs);
    } finally {
      if (!this.hasMicroTask) {
        this.vmTurnDone();
      }
    }
  }
}

function test(fn) {
  return function (done) {
    Zone.current.fork((lst = new VMTurnZoneSpec(done))).run(fn);
  };
}

test(() => {
  Promise.resolve(0).then(() => {
    Promise.resolve(0).then(() => {
      console.log("all micro done");
    });
  });
})(() => {
  console.log("done");
});
