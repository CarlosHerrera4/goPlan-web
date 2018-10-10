import { PostCreateComponent } from './../post-create/post-create.component';
import { PostService } from './../../../shared/services/post.service';
import { Post } from './../../../shared/models/post.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<Post> = [];
  onPostsChangesSubscription: Subscription;
  @ViewChild(PostCreateComponent) postCreateComponent: PostCreateComponent;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.userId),
      switchMap(userId => this.postService.list(userId))
    ).subscribe((posts: Array<Post>) => this.posts = posts);

    this.onPostsChangesSubscription = this.postService.onPostsChanges()
      .subscribe((posts: Array<Post>) => this.posts = posts);
  }

  ngOnDestroy() {
    this.onPostsChangesSubscription.unsubscribe();
  }

  canDeactivate(): boolean {
    return this.postCreateComponent.canDeactivate();
  }

}
