import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";

import { tap } from "rxjs/internal/operators";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/index";
import { AuthService } from "../app/authentication/auth.service";
import { Router } from "@angular/router";

const appKey = "kid_rk2HHHCEQ";
const appSecret = "39651f5ca816476f925d9fccd6f62b2f";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler) :
  Observable<HttpEvent<any>> {
    if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
          'Content-Type': `application/json`
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          'Authorization': `Kinvey ${localStorage.getItem('authtoken')})}`,
          'Content-Type': `application/json`
        }
      });
    }

    //.pipe(tap())... handles Unauthorized responses!
    return next.handle(request)
      .pipe(tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && request.url.endsWith('login')) {
          this.successFullLogin(event['body']);
        }
      }, (error: any) => {
        if (error instanceof HttpErrorResponse) {
          switch(error.status) {
            case 401:
              this.router.navigateByUrl('/login');
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              this.router.navigateByUrl('/server-error');
              break;
          }
        }
      }))
  }

  private successFullLogin(data) {
    this.authService.authtoken = data['_kmd']['authtoken'];
    localStorage.setItem('authtoken', data['_kmd']['authtoken']);
    localStorage.setItem('username', data['username']);
    this.router.navigateByUrl('/home');
  }
}
