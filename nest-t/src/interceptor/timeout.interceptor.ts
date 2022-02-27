import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

const IgnoredPropertyName = Symbol('IgnoredPropertyName');

export function TimeoutInterceptorIgnore() {
  return function (
    target,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    descriptor.value[IgnoredPropertyName] = true;
  };
}

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isIgnored = context.getHandler()[IgnoredPropertyName];
    if (isIgnored) {
      return next.handle();
    }

    return next.handle().pipe(timeout(5000));
  }
}
