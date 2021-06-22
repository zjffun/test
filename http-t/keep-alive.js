/*
  127.0.0.1 test.com

  test.com/foo
  test.com/bar
 */
const http = require("http");

const keepAliveTimeout = 60 * 60 * 1000;

const requestListener = function (req, res) {
  if (!req.connection.__url) {
    req.connection.__url = req.url;
  }
  res.writeHead(200);
  res.end(req.connection.__url);
};

const server = http.createServer(requestListener);

server.keepAliveTimeout = keepAliveTimeout;

/*
server.keepAliveTimeout roughly equal:

1. res.setHeader("Keep-Alive", "timeout=keepAliveTimeout");
2. 
  ```
  server.on("connection", (socket) => {
    // socket.setKeepAlive(false);
    socket.setKeepAlive(true, keepAliveTimeout);
  });
  ```
*/

server.listen(8080);
