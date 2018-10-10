import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseApiService {
  private static readonly SESSIONS_API = `${BaseApiService.BASE_API}/sessions`;
  private static readonly CURRENT_USER_KEY = 'current-user';

  user: User;
  userSubject: Subject<User> = new Subject();

  constructor(private http: HttpClient) {
    super();
    const userData = localStorage.getItem(SessionService.CURRENT_USER_KEY);
    if (userData) {
      this.user = Object.assign(new User(), JSON.parse(userData));
    }
    this.notifyUserChanges();
  }

  authenticate(user: User): Observable<User | ApiError> {
    return this.http.post<User>(SessionService.SESSIONS_API, user, BaseApiService.defaultOptions)
      .pipe(
        map((user: User) => {
          this.doAuthenticate(user);
          return user;
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<void | ApiError> {
    return this.http.delete(SessionService.SESSIONS_API, BaseApiService.defaultOptions)
      .pipe(
        map(() => this.doLogout()),
        catchError(this.handleError)
      );
  }

  onUserChanges(): Observable<User> {
    return this.userSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.user ? true : false;
  }

  private notifyUserChanges(): void {
    this.userSubject.next(this.user);
  }

  private doAuthenticate(user: User): void {
    this.user = user;
    localStorage.setItem(SessionService.CURRENT_USER_KEY, JSON.stringify(this.user));
    this.notifyUserChanges();
  }

  private doLogout(): void {
    this.user = null;
    localStorage.removeItem(SessionService.CURRENT_USER_KEY);
    this.notifyUserChanges();
  }

}
