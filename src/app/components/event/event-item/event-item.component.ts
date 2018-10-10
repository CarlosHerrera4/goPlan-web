import { Subscription } from 'rxjs';
import { UserService } from './../../../shared/services/user.service';
import { SessionService } from './../../../shared/services/session.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit, OnDestroy {
  @Input() user: User = new User();
  authUser: User = new User();
  onAuthUserChanges: Subscription;

  constructor(
    private router: Router,
    private SessionService: SessionService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;
    this.onAuthUserChanges = this.sessionService.onUserChanges()
      .subscribe((user: User) => this.authUser = user);
  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }

}
