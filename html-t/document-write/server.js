const http = require("http");
const fs = require("fs");

const requestListener = function (req, res) {
  if (req.url === "/order1.js") {
    setTimeout(() => {
      const file = req.url.slice(1);
      // res.writeHead(500);
      res.write(fs.readFileSync(file));
      res.end();
    }, 5000);
    return;
  }

  // if (req.url === "/document.write.js") {
  //   setTimeout(() => {
  //     const file = req.url.slice(1);
  //     res.writeHead(500);
  //     res.write(fs.readFileSync(file));
  //     res.end();
  //   }, 5000);
  //   return;
  // }

  try {
    const file = req.url.slice(1);
    res.write(fs.readFileSync(file));
    res.end();
  } catch (error) {
    res.end();
  }

  return;
};

const server = http.createServer(requestListener);

server.listen(8081);
