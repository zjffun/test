require("zone.js");

var syncZoneSpec = {
  onScheduleTask: function () {
    throw new Error("No Async work is allowed in test.");
  },
};

function sync(fn) {
  return function (...args) {
    Zone.current.fork(syncZoneSpec).run(fn, args, this);
  };
}

sync(() => {
  Promise.resolve("value").then();
})();
