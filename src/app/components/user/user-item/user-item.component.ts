import { SessionService } from './../../../shared/services/session.service';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit, OnDestroy {
  @Input() user: User = new User();
  authUser: User = new User();
  onAuthUserChanges: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService) {}

  ngOnInit() {
    this.authUser = this.sessionService.user;
    this.onAuthUserChanges = this.sessionService.onUserChanges()
      .subscribe((user: User) => this.authUser = user);
  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }

  onClickDeleteUser() {
    if (this.authUser.id === this.user.id) {
      this.userService.delete(this.user.id)
        .pipe(switchMap(() => this.sessionService.logout()))
        .subscribe(() => {
          this.router.navigate(['/login']);
        });
    }
  }
}
