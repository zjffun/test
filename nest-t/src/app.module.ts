import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestProxyController } from './nestProxy.controller';
import { ProxyTargetController } from './proxyTarget.controller';

@Module({
  imports: [],
  controllers: [AppController, ProxyTargetController, NestProxyController],
  providers: [AppService],
})
export class AppModule {}
