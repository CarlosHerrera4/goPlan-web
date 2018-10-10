import { User } from './user.model';

export class Post {
  id?: string;
  name: string;
  content: string;
  images: Array<string> = [];
  tags: Array<string> = [];
  user?: string | User = new User();
  createdAt?: Date;
  imageFiles: Array<File> = [];

  public asFormData(): FormData {
    const data = new FormData();

    data.append('name', this.name);
    data.append('content', this.content);
    
    for (const tag of this.tags) {
      data.append('tags', tag);
    }
    
    for (const imageFile of this.imageFiles) {
      data.append('images', imageFile);
    }

    return data;
  }
}
