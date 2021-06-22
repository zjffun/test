/*
  127.0.0.1 bar.test.com
  127.0.0.1 foo.test.com
 */
const http = require("http");

const requestListener = function (req, res) {
  res.setHeader("Set-Cookie", [
    "language=javascript; Domain=bar.test.com",
    "language1=javascript; Domain=.test.com",
    "language2=javascript; Domain=test.com",
    "language3=javascript; Domain=*.test.com",
  ]);
  res.writeHead(200);
  res.end("Hello, World!");
};

const server = http.createServer(requestListener);
server.listen(8080);
