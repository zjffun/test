const EventEmitter = require("events");

const myEmitter = new EventEmitter();
myEmitter.on("testevent", function (a, b) {
  console.log(1);
});

myEmitter.emit("testevent");

console.log(2);
