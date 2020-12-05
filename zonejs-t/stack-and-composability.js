require("zone.js/dist/zone-node");

let logs = [];
let zoneA = Zone.current.fork({
  name: "zoneA",
  onInvoke: function (
    delegate,
    currentZone,
    targetZone,
    callback,
    applyThis,
    applyArgs
  ) {
    logs.push("zoneA onInvoke");
    return delegate.invoke(targetZone, callback, applyThis, applyArgs);
  },
});
let zoneB = Zone.current.fork({
  name: "zoneB",
  onInvoke: function (
    delegate,
    currentZone,
    targetZone,
    callback,
    applyThis,
    applyArgs
  ) {
    logs.push("zoneB onInvoke");
    return delegate.invoke(targetZone, callback, applyThis, applyArgs);
  },
});
let zoneAChild = zoneA.fork({
  name: "zoneAChild",
  onInvoke: function (
    delegate,
    currentZone,
    targetZone,
    callback,
    applyThis,
    applyArgs
  ) {
    logs.push("zoneAChild onInvoke");
    return delegate.invoke(targetZone, callback, applyThis, applyArgs);
  },
});

zoneA.run(() => {
  zoneB.run(() => {
    zoneAChild.run(function test() {
      logs.push("begin run" + Zone.current.name);
      console.log("logs", logs);

      const error = new Error();
      console.log("trace", error.stack);
    });
  });
});
