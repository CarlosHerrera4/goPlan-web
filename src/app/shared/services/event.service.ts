// import { UserService } from './user.service';
import { Event } from './../models/event.model';
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
export class EventService extends BaseApiService {
    private static readonly USER_API = `${BaseApiService.BASE_API}/events`;

    private events: Array<Event> = [];

    private users: Array<User> = [];
    private usersSubject: Subject<Array<User>> = new Subject();

    eventSubject: Subject<Event> = new Subject();


    constructor(private http: HttpClient) {
        super();
    }

    list(): Observable<Array<Event> | ApiError> {
        return this.http.get<Array<Event>>(EventService.USER_API, BaseApiService.defaultOptions)
            .pipe(
                map((events: Array<Event>) => {
                    events = events.map(event => Object.assign(new Event(), event));
                    this.events = events;
                    this.notifyUsersChanges();
                    return events;
                }),
                catchError(this.handleError)
            );
    }

    create(user: User): Observable<User | ApiError> {
        return this.http.post<User>(EventService.USER_API, user, BaseApiService.defaultOptions)
            .pipe(
                map((user: User) => Object.assign(new User(), user)),
                catchError(this.handleError));
    }

    delete(id: string): Observable<void | ApiError> {
        return this.http.delete<void>(`${EventService.USER_API}/${id}`, BaseApiService.defaultOptions)
            .pipe(
                tap(() => {
                    this.users = this.users.filter(u => u.id !== id);
                    this.notifyUsersChanges();
                }),
                catchError(this.handleError)
            );
    }

    onEventChanges(): Observable<Event> {
        return this.eventSubject.asObservable();
    }

    // onUsersChanges(): Observable<Array<User>> {
    //     return this.usersSubject.asObservable();
    // }

    private notifyUsersChanges(): void {
        this.usersSubject.next(this.users);
    }

}
