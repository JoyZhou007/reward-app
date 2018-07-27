import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

/*设置请求的基地址，方便替换*/

// const baseurl = '';
const baseurl = '/activity/app';

@Injectable()
export class HandleInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const newReq = req.clone({
      url: `${baseurl}${req.url}`,
    });

    // extend server response observable with logging
    return next.handle(newReq)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => {
          },
          // Operation failed; error is an HttpErrorResponse
          error => {
            // console.log('error', error);
          }
        ),
        // Log when response observable either completes or errors
        finalize(() => {

        })
      );
  }
}
