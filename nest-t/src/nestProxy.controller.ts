import { All, Body, Controller, Next, Req, Res } from '@nestjs/common';
import * as httpProxy from 'http-proxy';
import * as streamArray from 'stream-array';
const os = require('os');

@Controller('nest-proxy')
export class NestProxyController {
  private proxy = httpProxy.createProxyServer({});

  @All()
  proxyAll(@Body() body, @Req() req, @Res() res, @Next() next) {
    req.url = '/proxy-target';

    let buffer;

    // streamify bodyParser handled body
    if (req.readableEnded) {
      /**
       * if not add `os.EOL` the length of stream will less than the Content-Length.
       * Then the server will consider the request body is not ended.
       *
       * https://stackoverflow.com/questions/4824451/detect-end-of-http-request-body
       */
      buffer = streamArray([JSON.stringify(req.body), os.EOL]);
    }

    this.proxy.web(req, res, {
      target: 'http://localhost:3000',
      buffer,
    });
  }
}
