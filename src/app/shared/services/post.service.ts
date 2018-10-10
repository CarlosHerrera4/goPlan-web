import { Post } from '../models/post.model';
import { ApiError } from '../models/api-error.model';
import { BaseApiService } from './base-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseApiService {
  private static readonly USER_API = `${BaseApiService.BASE_API}/users`;
  private static readonly POST_API = `/posts`;

  private posts: Array <Post> = [];
  private postsSubject: Subject <Array<Post>> = new Subject();

  constructor(private http: HttpClient) {
    super();
  }

  list(userId: string): Observable <Array<Post> | ApiError > {
    return this.http.get<Array<Post>>(`${PostService.USER_API}/${userId}${PostService.POST_API}`, BaseApiService.defaultOptions)
      .pipe(
        map((posts: Array<Post>) => {
          posts = posts.map(post => Object.assign(new Post(), post));
          this.posts = posts;
          this.notifyPostsChanges();
          return posts;
        }),
        catchError(this.handleError)
      );
  }

  get(userId: string, id: String): Observable<Post | ApiError> {
    return this.http.get<Post>(`${PostService.USER_API}/${userId}${PostService.POST_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        map((post: Post) => Object.assign(new Post(), post)),
        catchError(this.handleError));
  }

  create(userId: string, post: Post): Observable < Post | ApiError > {
    return this.http.post<Post>(`${PostService.USER_API}/${userId}${PostService.POST_API}`, post.asFormData(), { withCredentials: true })
      .pipe(
        map((post: Post) => {
          post = Object.assign(new Post(), post);
          this.posts.push(post);
          this.notifyPostsChanges();
          return post;
        }),
        catchError(this.handleError));
  }

  delete(userId: string, id: string): Observable < void | ApiError > {
    return this.http.delete<void>(`${PostService.USER_API}/${userId}${PostService.POST_API}/${id}`, BaseApiService.defaultOptions)
      .pipe(
        tap(() => {
          this.posts = this.posts.filter(u => u.id !== id);
          this.notifyPostsChanges();
        }),
        catchError(this.handleError)
      );
  }

  onPostsChanges(): Observable < Array < Post >> {
    return this.postsSubject.asObservable();
  }

  private notifyPostsChanges(): void {
    this.postsSubject.next(this.posts);
  }
}
