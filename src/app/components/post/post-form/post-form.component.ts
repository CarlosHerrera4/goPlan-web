import { Post } from './../../../shared/models/post.model';
import { Component, Output, Input, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {
  private static readonly IMG_PREVIEW: string = 'http://www.nfscars.net/static/img/not-found.png';

  @Input() post: Post = new Post();
  @Output() postSubmit: EventEmitter<Post> = new EventEmitter();
  @ViewChild('postForm') postForm: FormGroup;
  previewImages: Array<string | ArrayBuffer> = [];

  constructor(private changesDetector: ChangeDetectorRef) {}

  onClickAddTag(tag: HTMLInputElement): void {
    const tagValue: string = tag.value;
    if (tagValue && this.post.tags.indexOf(tagValue) === -1) {
      this.post.tags.push(tagValue);
    }
    tag.value = '';
  }

  onClickRemoveTag(tag: string): void {
    this.post.tags = this.post.tags.filter(t => t !== tag);
  }


  onChangeImageFile(image: HTMLInputElement): void {
    if (image.files) {
      this.previewImages = [];
      for (let i = 0; i < image.files.length; i++) {
        this.post.imageFiles.push(image.files[i]);
        this.renderPreviewImg(image.files[i]);
      }
    }
  }

  onImgPreviewError(image: HTMLImageElement): void {
    image.src = PostFormComponent.IMG_PREVIEW;
  }

  onSubmitPostForm(): void {
    if (this.postForm.valid) {
      this.postSubmit.emit(this.post);
    }
  }

  reset(): void {
    this.post = new Post();
    this.postForm.reset();
  }

  canDeactivate(): boolean {
    return this.postForm.dirty ? window.confirm('Discard changes for Post? Are you sure?') : true;
  }

  private renderPreviewImg(imageFile: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      this.previewImages.push(reader.result);
      this.changesDetector.markForCheck();
    };
  }
}

