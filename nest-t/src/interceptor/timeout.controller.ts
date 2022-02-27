import { Controller, Get, UseInterceptors } from '@nestjs/common';
import {
  TimeoutInterceptor,
  TimeoutInterceptorIgnore,
} from './timeout.interceptor';

@Controller('/timeout')
@UseInterceptors(TimeoutInterceptor)
export class TimeoutController {
  @Get('/use-interceptor')
  asyncuseInterceptor(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve('ok'), 10000);
    });
  }

  @Get('/ignore-interceptor')
  @TimeoutInterceptorIgnore()
  async ignoreInterceptor(): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => resolve('ok'), 10000);
    });
  }
}
