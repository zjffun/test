import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyTargetController } from './proxyTarget.controller';

@Module({
  imports: [],
  controllers: [AppController, ProxyTargetController],
  providers: [AppService],
})
export class AppModule {}
