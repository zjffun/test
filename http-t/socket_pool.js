/**
 * open 6 pending req
 * http://localhost:8080/script
 *
 * page will pending
 * http://localhost:8080/page
 */

const http = require("http");

const requestListener = function (req, res) {
  if (req.url === "/page") {
    res.writeHead(200);
    res.end("OK");
  }

  if (req.url === "/script") {
    res.write(`
      <script src="http://localhost:8080?1"></script>
      <script src="http://localhost:8080?2"></script>
      <script src="http://localhost:8080?3"></script>
      <script src="http://localhost:8080?4"></script>
      <script src="http://localhost:8080?5"></script>
      <script src="http://localhost:8080?6"></script>
      `);
  }
};

const server = http.createServer(requestListener);

server.listen(8080);
