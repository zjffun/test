const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    this.emit("event1");

    // use nextTick to emit the event once a handler is assigned
    process.nextTick(() => {
      this.emit("event");
    });
  }
}

const myEmitter = new MyEmitter();
myEmitter.on("event", () => {
  console.log("an event occurred!");
});

myEmitter.on("event1", () => {
  console.log("an event1 occurred!");
});
