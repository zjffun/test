import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { createProxyMiddleware } = require('http-proxy-middleware');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/nest-proxy', (req, res, next) => {
    next();
  });

  app.use('/proxy', (req, res, next) => {
    setTimeout(() => {
      req.headers.test = 'foo';
      next();
    }, 1000);
  });

  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'http://localhost:3000/',
      pathRewrite: {
        '^/proxy': '/proxy-target',
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
