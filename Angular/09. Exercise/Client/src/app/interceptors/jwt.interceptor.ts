import {
  HttpResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpErrorResponse
} from "@angular/common/http";

import { tap } from "rxjs/internal/operators";

import { Observable } from "rxjs/index";
import { Injectable } from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpEvent<any>> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request)
      .pipe(tap((res : any) => {
        if (res instanceof HttpResponse && res.body.token) {
          this.saveToken(res.body);
          this.toastr.success(res.body.message, 'Success!');
          this.router.navigateByUrl('/furniture/all');
        }

        if (res instanceof HttpResponse && res.body.success && res.url.endsWith('signup')) {
          this.toastr.success(res.body.message, 'Success!');
          this.router.navigateByUrl('/signin');
        }

        if (res instanceof HttpResponse && res.body.success && res.url.endsWith('create')) {
          this.toastr.success(res.body.message, 'Success!');
          this.router.navigateByUrl('/furniture/all');
        }
    }));
  }

  private saveToken(data) {
    localStorage.setItem('currentUser', JSON.stringify({
      'username': data.user.name,
      'token': data.token
    }))
  }
}
