const { Readable } = require("stream");

const readable = Readable.from(["foo"]);
readable.push('bar');
// readable.push(null);
// readable.push('bar2');
// readable.push(null);

readable.pipe(process.stdout);
readable.pipe(process.stdout);

setTimeout(() => {
  readable.pipe(process.stdout);
}, 0);
