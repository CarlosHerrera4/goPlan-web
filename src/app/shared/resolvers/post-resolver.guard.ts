import { ApiError } from './../models/api-error.model';
import { catchError } from 'rxjs/operators';
import { PostService } from './../services/post.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostResolverGuard implements Resolve<Post | ApiError> {

  constructor(private postService: PostService, private router: Router) {}

  resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Post | ApiError> {
      return this.postService.get(next.params.userId, next.params.id).pipe(
        catchError((error: ApiError) => {
          this.router.navigate(['/users']);
          return throwError(error);
        })
      );
  }
}
