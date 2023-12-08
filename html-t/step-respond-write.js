const http = require("http");

const requestListener = function (req, res) {
  if (req.url === "/index") {
    res.writeHead(200);

    setTimeout(() => {
      res.write("<div>step1</div>");
    }, 1000);

    setTimeout(() => {
      res.end("<div>step2</div>");
    }, 10000);

    return;
  }
};

const server = http.createServer(requestListener);

server.listen(8080);
