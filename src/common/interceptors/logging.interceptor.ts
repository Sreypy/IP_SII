import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql'; // 👈 Import this
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    let method = '';
    let url = '';

    // ✅ Check if the request is GraphQL
    if (context.getType<string>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      method = 'GraphQL';
      url = info.fieldName; // Logs the query name (e.g., "products")
    } else {
      // Standard REST handling
      const req = context.switchToHttp().getRequest();
      method = req.method;
      url = req.url;
    }

    console.log(`Incoming Request: ${method} ${url}`);

    return next
      .handle()
      .pipe(
        tap(() => console.log(`Execution time: ${Date.now() - now}ms`)),
      );
  }
}