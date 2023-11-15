const http = require("http");

const requestListener = function (req, res) {
  if (req.url === "/index") {
    res.write(`
<script>
const xhr = new XMLHttpRequest();

xhr.addEventListener("timeout", () => {
  console.log("timeout", Date.now());
});
xhr.addEventListener("load", () => {
  console.log("load", Date.now());
});
xhr.addEventListener("error", () => {
  console.log("error", Date.now());
});
xhr.addEventListener("abort", () => {
  console.log("abort", Date.now());
});
xhr.addEventListener("readystatechange", () => {
  console.log("readystatechange", Date.now());
  console.log("xhr.readyState", xhr.readyState);
  console.log("xhr.responseText", xhr.responseText);
});
xhr.addEventListener("progress", () => {
  console.log("progress", Date.now());
});
xhr.addEventListener("loadstart", () => {
  console.log("loadstart", Date.now());
});
xhr.addEventListener("loadend", () => {
  console.log("loadend", Date.now());
});

xhr.open("GET", "/timeout");

xhr.timeout = 5000;

xhr.send();
</script>`);
    res.end();
    return;
  }

  if (req.url === "/timeout") {
    res.writeHead(200);

    req.on("aborted", () => {
      console.log("aborted", Date.now());
    })

    req.on("close", () => {
      console.log("close", Date.now());
    });

    setTimeout(() => {
      res.write("OK1");
    }, 1000);

    setTimeout(() => {
      res.end("OK2");
    }, 10000);
  }
};

const server = http.createServer(requestListener);

server.listen(8080);
