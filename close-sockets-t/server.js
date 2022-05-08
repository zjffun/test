const http = require("http");

const keepAliveTimeout = 5 * 60 * 1000;

function createServer(ip) {
  function requestListener(req, res) {
    console.log(req.url, ip);
    res.writeHead(200);
    res.end(ip);
  }

  const server = http.createServer(requestListener);

  server.keepAliveTimeout = keepAliveTimeout;

  server.listen(8080, ip);
}

createServer("127.0.0.1");
createServer("192.168.31.157");
