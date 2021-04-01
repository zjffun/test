const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);

  if (req.url === "/") {
    res.write(`
      <script>
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/post-body');
        xhr.send('foo')
      </script>
      `);
    res.end();
  }

  if (req.url === "/post-body") {
    // req.on("data", (d) => {
    //   console.log("data1", d);
    // });
    // req.on("data", (d) => {
    //   console.log("data2", d);
    // });
    req.on("end", () => {
      console.log("end1");
    });
    // req.on("end", () => {
    //   console.log("end2");
    // });
    setTimeout(() => {
      /**
       * if no `req.on('data')` before, data will consume here.
       */
      req.on("data", (d) => {
        console.log("setTimeout data", d);
      });
      req.on("end", () => {
        console.log("setTimeout end");
      });
    }, 1000);
  }
});

server.listen(3000);
