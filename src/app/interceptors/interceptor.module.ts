import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          let errorMsg = '';
          if (err.error instanceof ErrorEvent) {
            console.log('client side error');
            errorMsg = `Error : ${err.error.message}`;
          } else {
            console.log('client side error');
            errorMsg = `Code : ${err.status} Message : ${err.error.message}`;
          }
          return throwError(errorMsg);
        })
      );
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ],
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class Interceptor { }
