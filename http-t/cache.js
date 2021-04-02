const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);

  switch (req.url) {
    case "/":
      res.write(`
        <script>
        fetch('/cache-control')
        fetch('/last-modified')
        </script>
      `);
      break;

    case "/cache-control":
      res.setHeader("Cache-Control", "");
      // public, no-cache,
      res.setHeader("Cache-Control", "max-age=10");
      break;

    case "/last-modified":
      var date = new Date();
      res.setHeader("Last-Modified", date.toGMTString());

    default:
      break;
  }

  res.end();
});

server.listen(3000);
