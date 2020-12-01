require("zone.js");

let logZone = Zone.current.fork({
  name: "logZone",
  onInvoke: function (
    parentZoneDelegate,
    currentZone,
    targetZone,
    callback,
    delegate,
    applyThis,
    applyArgs,
    source
  ) {
    console.log(targetZone.name, "enter");
    parentZoneDelegate.invoke(
      targetZone,
      callback,
      applyThis,
      applyArgs,
      source
    );
    console.log(targetZone.name, "leave");
  },
});

logZone.run(function myApp() {
  console.log(Zone.current.name, "queue promise");
  Promise.resolve("OK").then((v) =>
    console.log(Zone.current.name, "Promise", v)
  );
});
