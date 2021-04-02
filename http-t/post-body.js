const fs = require("fs");
const http = require("http");

const server = http.createServer(function (req, res) {
  console.log(req.url);

  // if (req.url === "/") {
  //   res.write(`
  //     <script>
  //       const xhr = new XMLHttpRequest();
  //       xhr.open('POST', '/post-body');
  //       xhr.send('foo')
  //     </script>
  //     `);
  //   res.end();
  // }

  if (req.url === "/post-body") {
    req.on("data", (d) => {
      console.log("data1", d);
    });
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
        console.log("setTimeout data1", d);
      });
      req.on("data", (d) => {
        console.log("setTimeout data2", d);
      });
      req.on("end", () => {
        console.log("setTimeout end1");
      });
      req.on("end", () => {
        console.log("setTimeout end2");
      });
    }, 1000);
  }
});

server.listen(3000);

const postReq = http.request({
  host: "127.0.0.1",
  port: "3000",
  path: "/post-body",
  method: "POST",
  headers: {
    // "Content-Length": 2,
  },
});

// Write data to request body
let file = "foo";
try {
  file = fs.readFileSync("/Users/zjf/t/file");
} catch (error) {}
postReq.write(file);
setTimeout(() => {
  postReq.write("bar");
  postReq.end();
}, 2000);
