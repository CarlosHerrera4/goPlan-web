import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Array<User> = [];
  onUsersChangesSubscription: Subscription;
  finderPattern: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.list()
      .subscribe(
        (users: Array<User>) => this.users = users
      );
    this.onUsersChangesSubscription = this.userService.onUsersChanges()
      .subscribe(
      (users: Array<User>) => this.users = users
      );
  }

  ngOnDestroy() {
    this.onUsersChangesSubscription.unsubscribe();
  }

  onPatternChange(pattern: string) {
    this.finderPattern = pattern;
  }

}
