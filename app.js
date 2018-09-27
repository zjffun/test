const http = require('http')
const url = require('url')

http.createServer(function(request, response){
  var params = url.parse(request.url, true).query;
  if(undefined == params.t){
var html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script>
    var XHR = new XMLHttpRequest();
    XHR.open('get', 'http://localhost:8848?t=a');
    XHR.send(null);
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            if ( XHR.status === 200 ) {
              document.write('AJAX获取到的内容为：'+XHR.responseText);
            }
        }
    }
  </script>
</body>
</html>`;
    response.write(html);
    response.end();
  }
  if('a' == params.t){
    response.write('hello world');
    response.end();
  }
}).listen(8848);