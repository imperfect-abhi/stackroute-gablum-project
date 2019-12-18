import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/register-request';
import { RegisterToken } from '../interfaces/register-token';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommunicatorService } from './communicator.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterDataService {

  constructor(
    private http: HttpClient,
    private comms: CommunicatorService
    ) { }

  register(params: RegisterRequest) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};
    this.http.post<RegisterToken>(
      environment.registerApi,
      JSON.stringify(params),
      httpOptions
      )
      .pipe(
        catchError(err => {
          this.comms.postMessage(
            this,
            '@all',
            {registrationResult: null});
          return throwError(err);
        })
      ).subscribe(res => {
        this.comms.postMessage(
          this,
          '@all',
          {registrationResult: res}
        );
      },
      err => {
        this.comms.postMessage(
          this,
          '@all',
          {registrationResult: null}
        );
      });
  }
}
