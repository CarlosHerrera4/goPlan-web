import { User } from '../models/user.model';
import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseApiService {
  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;

  private users: Array<User> = [];
  private usersSubject: Subject<Array<User>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(): Observable<Array<User> | ApiError> {
    return this.http.get<Array<User>>(UserService.USER_API, BaseApiService.defaultOptions)
      .pipe(
        map((users: Array<User>) => {
          users = users.map(user => Object.assign(new User(), user));
          this.users = users;
          this.notifyUsersChanges();
          return users;
        }),
        catchError(this.handleError)
      );
  }

  create(user: User): Observable<User | ApiError> {
    return this.http.post<User>(UserService.USER_API, user, BaseApiService.defaultOptions)
      .pipe(
        map((user: User) => Object.assign(new User(), user)),
        catchError(this.handleError));
  }

  delete(id: string): Observable<void | ApiError> {
    return this.http.delete<void>(`${UserService.USER_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.users = this.users.filter(u => u.id !== id);
          this.notifyUsersChanges();
        }),
        catchError(this.handleError)
      );
  }

  onUsersChanges(): Observable<Array<User>> {
    return this.usersSubject.asObservable();
  }

  private notifyUsersChanges(): void {
    this.usersSubject.next(this.users);
  }

}
