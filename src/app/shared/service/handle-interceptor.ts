import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable()
export class HandleInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
          },
          // Operation failed; error is an HttpErrorResponse
          error => {
            console.log('error', error);
          }
        ),
        // Log when response observable either completes or errors
        finalize(() => {

        })
      );
  }
}
