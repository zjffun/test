/*
cert:
openssl req -nodes -new -x509 -keyout server.key -out server.cert

hosts:
127.0.0.1 first.test.com
127.0.0.1 first-2.test.com
127.0.0.1 third.test-third.com

open:
https://foo.test.com:8080/
 */
const fs = require("fs");
const https = require("https");

const requestListener = function (req, res) {
  console.log(
    {
      url: req.url,
      cookie: req.headers.cookie,
    }
  );
  
  /**
   * [SameSite cookies - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
   *
   * The SameSite attribute of the Set-Cookie HTTP response header allows you to declare
   * if your cookie should be restricted to a first-party or same-site context.
   */
  if (req.url === "/") {
    res.writeHead(200);
    res.end(`
    <script>
      fetch('https://first-2.test.com:8080/test.js', {
        credentials: 'include',
      }).then(console.log);
      fetch('https://third.test-third.com:8080/test-third.js', {
        credentials: 'include',
      }).then(console.log);
    </script>
    `);
  } else if (req.url === '/test.js') {
    res.setHeader("Set-Cookie", [
      "test=javascript; Domain=test.com",
      "testSameSite=javascript; Domain=test.com; Secure; SameSite=None",
      "first2Test=javascript; Domain=first-2.test.com",
      "first2TestSameSiteNone=javascript; Domain=first-2.test.com; Secure; SameSite=None",
    ]);
    res.setHeader("Access-Control-Allow-Origin", "https://first.test.com:8080");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.writeHead(200);
    res.end();
  } else if (req.url === '/test-third.js') {
    res.setHeader("Set-Cookie", [
      "testThird=javascript; Domain=test-third.com",
      "testThirdSameSite=javascript; Domain=test-third.com; Secure; SameSite=None",
      "thirdTestThird=javascript; Domain=third.test-third.com",
      "thirdTestThirdSameSiteNone=javascript; Domain=third.test-third.com; Secure; SameSite=None",
    ]);
    res.setHeader("Access-Control-Allow-Origin", "https://first.test.com:8080");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.writeHead(200);
    res.end();
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://first.test.com:8080");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.writeHead(200);
    res.end();
  }
};

const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.cert"),
};

const server = https.createServer(options, requestListener);
server.listen(8080);
