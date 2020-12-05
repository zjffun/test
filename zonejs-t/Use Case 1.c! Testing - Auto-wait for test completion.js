require("zone.js/dist/zone-node");

class TrackTaskZoneSpec {
  constructor(done) {
    this.name = "TaskTrackingZone";
    this.done = done;
  }

  onHasTask(delegate, current, target, hasTaskState) {
    if (!hasTaskState.microTask && !hasTaskState.macroTask) {
      this.done();
    }
  }
}

function async(fn) {
  return function (done) {
    Zone.current.fork(new TrackTaskZoneSpec(done)).run(fn);
  };
}

async(() => {
  setTimeout(() => {
    Promise.resolve(0).then(() => {
      // only after this code executes will the test complete.
      console.log("wait for me");
    });
  }, 0);
})(() => {
  console.log("done");
});
