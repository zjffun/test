require("zone.js");
const performance = require("perf_hooks").performance;

let timingZone = Zone.current.fork({
  name: "timingZone",
  onInvoke: function (
    parentZoneDelegate,
    currentZone,
    targetZone,
    callback,
    applyThis,
    applyArgs,
    source
  ) {
    var start = performance.now();
    parentZoneDelegate.invoke(
      targetZone,
      callback,
      applyThis,
      applyArgs,
      source
    );
    var end = performance.now();
    console.log(
      "Zone:",
      targetZone.name,
      "Intercepting zone:",
      currentZone.name,
      "Duration:",
      end - start
    );
  },
});
let logZone = timingZone.fork({
  name: "logZone",
  onInvoke: function (
    parentZoneDelegate,
    currentZone,
    targetZone,
    callback,
    applyThis,
    applyArgs,
    source
  ) {
    console.log(
      "Zone:",
      targetZone.name,
      "Intercepting zone:",
      currentZone.name,
      "enter"
    );
    parentZoneDelegate.invoke(
      targetZone,
      callback,
      applyThis,
      applyArgs,
      source
    );
    console.log(
      "Zone:",
      targetZone.name,
      "Intercepting zone:",
      currentZone.name,
      "leave"
    );
  },
});
let appZone = logZone.fork({ name: "appZone" });

appZone.run(function myApp() {
  console.log("Zone:", Zone.current.name, "Hello World!");
});
