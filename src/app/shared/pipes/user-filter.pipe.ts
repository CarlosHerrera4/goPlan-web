import { Pipe, PipeTransform } from '@angular/core';
import { User } from './../models/user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(users: Array<User>, pattern: string, field: string = 'email'): Array<User> {
    if (!users) {
      return [];
    } else if (!pattern) {
      return users;
    }

    const regex = new RegExp(pattern, 'i');
    return users.filter(f => f[field].match(regex));
  }

}
