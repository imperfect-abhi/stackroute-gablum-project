import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Observable, of, throwError } from 'rxjs';
import { LoggerService } from './logger.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthenticationService,
    private logger: LoggerService,
    private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.logger.log(this);
            this.auth.clearProfile();
          } else if (err.status === 403) {
            this.logger.log(this);
            // this.router.navigate(['/dashboard']);
            // this.auth.clearProfile();
          }
        }
        return throwError(err);
      })
    );
  }
}
