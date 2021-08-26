/*
127.0.0.1 foo.test.com
127.0.0.1 bar.test.com
127.0.0.1 bar.test1.com
 */
const http = require("http");

const requestListener = function (req, res) {
  /**
   * [SameSite cookies - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)
   * 
   * The SameSite attribute of the Set-Cookie HTTP response header allows you to declare 
   * if your cookie should be restricted to a first-party or same-site context.
   */
  res.setHeader("Set-Cookie", [
    "language=javascript; Domain=bar.test1.com; SameSite=None; Secure",
    "language1=javascript; Domain=.test.com",                                                                                                                                                                                                                                                                                                                                                                         
    "language2=javascript; Domain=test.com",
    "language3=javascript; Domain=*.test.com",
  ]);
  res.setHeader("Access-Control-Allow-Origin", "http://foo.test.com:8080");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.writeHead(200);
  res.end(`
<script>
  fetch('http://bar.test1.com:8080', {
    credentials: 'include',
  }).then(console.log);
</script>
  `);
};

const server = http.createServer(requestListener);
server.listen(8080);
