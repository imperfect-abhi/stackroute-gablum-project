import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { pipe, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  constructor(
    private comms: CommunicatorService,
    private http: HttpClient,
    private logger: LoggerService) { }

  getData<T>(url: string, dest: string, key = 'inventory') {
    this.http.get<T>(url)
      .pipe(
        retry(3),
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.comms.postMessage(this, dest, { [key]: res });
      },
        err => {
          this.logger.log(err);
        });
  }

  patchData<T>(url: string, dest: string, data, key = 'inventory') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // console.log('datata :::', data);
    return this.http.patch<T>(url, data, httpOptions)
      .pipe(
        retry(3),
        catchError(err => {
          return throwError(err);
        })
      );
  }

  postData<T>(url: string, dest: string, data, key = 'inventory') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post<T>(url, data, httpOptions)
      .pipe(
        retry(3),
        catchError(err => {
          return throwError(err);
        })
      )
      .subscribe(res => {
        this.comms.postMessage(this, dest, { [key]: res });
        this.getData<T>(url, dest, key);
      },
        err => {
          this.logger.log(err);
        });
  }
  deleteData<T>(url: string, dest: string, key = 'inventory') {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<T>(url, httpOptions)
      .pipe(
        retry(3),
        catchError(err => {
          return throwError(err);
        })
      );
  }
}
