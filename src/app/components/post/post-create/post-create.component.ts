import { PostFormComponent } from './../post-form/post-form.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from './../../../shared/models/post.model';
import { PostService } from '../../../shared/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html'
})
export class PostCreateComponent implements OnInit {
  @ViewChild(PostFormComponent) postFormComponent: PostFormComponent;
  userId: string;

  constructor(
    private routes: ActivatedRoute,
    private postService: PostService) { }

  
  ngOnInit() {
    this.routes.params.subscribe(params => this.userId = params.userId);
  }

  onSubmitCreatePostForm(post: Post): void {
    this.postService.create(this.userId, post)
      .subscribe((post: Post) => {
        this.postFormComponent.reset();
      });
  }

  canDeactivate(): boolean {
    return this.postFormComponent.canDeactivate();
  }
}
