require("zone.js");

// Save the original reference to setTimeout
let originalSetTimeout = global.setTimeout;
// Overwrite the API with a function which wraps callback in zone.
global.setTimeout = function (callback, delay) {
  // Use scheduleTask API on the current zone.
  Zone.current.scheduleMacroTask(
    // Debug information
    "setTimeout",
    // callback which needs to execute in the current zone.
    callback,
    // optional data such as if task is recurring.
    null,
    // Default schedule behavior
    (task) => {
      return originalSetTimeout(
        // Use the task invoke method, so that the task can
        // call callback in the correct zone.
        task.invoke,
        // original delay information
        delay
      );
    }
  );
};
debugger

// Create a logging zone
let logZone = Zone.current.fork({
  onScheduleTask: function (parentZoneDelegate, currentZone, targetZone, task) {
    // Print when async tasks are scheduled
    console.log("Schedule", task.source);
    return parentZoneDelegate.scheduleTask(targetZone, task);
  },

  onInvokeTask: function (
    parentZoneDelegate,
    currentZone,
    targetZone,
    task,
    applyThis,
    applyArgs
  ) {
    // Print when async tasks are invoked
    console.log("Invoke", task.source);
    return parentZoneDelegate.invokeTask(
      targetZone,
      task,
      applyThis,
      applyArgs
    );
  },
});

console.log("start");
logZone.run(() => {
  global.setTimeout(() => null, 0);
});
console.log("end");
