import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpErrorResponse
} from "@angular/common/http";

import { tap, catchError } from "rxjs/internal/operators";

import { Observable, throwError } from "rxjs/index";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(catchError((err : HttpErrorResponse) => {
        //We can handle requests errors here.
        switch (err.status) {
          case 401:
            this.toastr.error(err.error.message, 'Warning!');
            break;
          case 400:
            const message = Object.keys(err.error.errors)
              .map(e => err.error.errors[e])
              .join('\n');
            this.toastr.error(message, 'Warning!');
            break;
        }
        return throwError(err);
      }));
  }
}
