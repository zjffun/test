import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeoutController } from './interceptor/timeout.controller';
import { NestProxyController } from './nestProxy.controller';
import { ProxyTargetController } from './proxyTarget.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProxyTargetController,
    NestProxyController,
    TimeoutController,
  ],
  providers: [AppService],
})
export class AppModule {}
