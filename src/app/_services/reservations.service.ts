import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Observable, throwError } from 'rxjs';
import { Reservation } from '../_models/reservation';
import { TeeTime } from '../_models/teeTime';
import { Approval } from '../_models/approval';

@Injectable({
    providedIn: 'root'
  })
export class ReservationsService {
    addReserveURLUrl = environment.apiUrl + 'reservations/';
    gettimes = environment.apiUrl + 'reservations/';
    jwtHelper = new JwtHelperService();
    decodedToken: any;
    currentUser: User;

    constructor(private http: HttpClient) { }

    AddReservation(model: any): Observable<any> {
        return this.http.post<any>(this.addReserveURLUrl + 'reserve', model)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              return throwError(err.message);
            })
        );
    }

    ApproveReservation(approvalData: Approval): Observable<any> {
      return this.http.post<any>(this.addReserveURLUrl + 'approve', approvalData)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(err.message);
          })
      );
    }

    RemoveReservation(id: number): Observable<any> {
      return this.http.delete<any>(this.addReserveURLUrl + 'deletereservation?id=' + id)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(err.message);
          })
      );
  }

    getteeTimes(): Observable<any[]> {
        return this.http.get<any[]>(this.gettimes + 'getTeeTimes')
          .pipe(
            catchError((err: HttpErrorResponse) => {
              return throwError(err.message);
            })
        );
    }

    getteeTimesById(roleId: number): Observable<any[]> {
      return this.http.get<any[]>(this.gettimes + 'getTeeTimesById?id=' + roleId)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            return throwError(err.message);
          })
      );
    }
}
