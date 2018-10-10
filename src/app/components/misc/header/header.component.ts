import { SessionService } from './../../../shared/services/session.service';
import { Router } from '@angular/router';
import { User } from './../../../shared/models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  onUserChanges: Subscription;

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit() {
    this.user = this.sessionService.user;
    this.onUserChanges = this.sessionService.onUserChanges()
      .subscribe((user: User) => this.user = user);
  }

  ngOnDestroy() {
    this.onUserChanges.unsubscribe();
  }

  onClickLogout(): void {
    this.sessionService.logout()
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }
}
