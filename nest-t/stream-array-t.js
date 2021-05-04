const streamArray = require('stream-array');

let buffer;

buffer = streamArray([JSON.stringify({ aa: 1 })]);

buffer.pipe(process.stdout);
