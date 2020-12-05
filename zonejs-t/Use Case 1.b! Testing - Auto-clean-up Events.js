require("zone.js/dist/zone-node");

const EventEmitter = require("events");
const myEmitter = new EventEmitter();

class EventReleaseZoneSpec {
  constructor() {
    this.name = "CleanupZone";
    // Keep track of the outstanding EventTasks here.
    this.eventTasks = [];
  }

  onScheduleTask(parentZoneDelegate, currentZone, targetZone, task) {
    // Whenever new EventTask is scheduled add it to the
    // outstanding list of tasks.
    if (task.type == "eventTask") {
      this.eventTasks.push(task);
    }
    return parentZoneDelegate.scheduleTask(targetZone, task);
  }

  cleanup() {
    // Cancel all outstanding
    while (this.eventTasks.length) {
      Zone.current.cancelTask(this.eventTasks.pop());
    }
  }
}

// Wrap the tests function and automatically release EventTasks
// listeners when the test is completed.
function cleanup(fn) {
  return function (done) {
    let zoneSpec = new EventReleaseZoneSpec();
    let args = [
      () => {
        zoneSpec.cleanup();
        done();
      },
    ];
    Zone.current.fork(zoneSpec).run(fn, this, args);
  };
}

cleanup((done) => {
  myEmitter.addListener("click", () => console.log("click"));
  myEmitter.emit("click");
  done();
  myEmitter.emit("click");
})(() => {
  console.log("done");
});
