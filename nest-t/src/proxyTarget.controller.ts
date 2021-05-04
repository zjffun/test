import { Body, Controller, Get, Post, Req } from '@nestjs/common';

@Controller('proxy-target')
export class ProxyTargetController {
  @Post()
  post(@Body() body, @Req() req) {
    return new Promise((resolve, reject) => {
      if (req.readableEnded) {
        resolve(
          JSON.stringify({
            header: req.headers.test,
            body,
          }),
        );
      }

      const data = [];
      req.on('data', (chunk) => {
        console.log(chunk);
        data.push(chunk);
      });

      req.on('end', () => {
        resolve({
          header: req.headers.test,
          body: data.toString(),
        });
      });
    });
  }
}
