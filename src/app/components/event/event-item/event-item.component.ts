import { EventService } from './../../../shared/services/event.service';
import { Subscription } from 'rxjs';
import { UserService } from './../../../shared/services/user.service';
import { Event } from './../../../shared/models/event.model';
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
  @Input() event: Event = new Event();
  @Input() order;
  authUser: User = new User();
  onAuthUserChanges: Subscription;
  authEvent: Event = new Event();

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private userService: UserService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.authUser = this.sessionService.user;
    this.onAuthUserChanges = this.eventService.onEventChanges()
      .subscribe((event: Event) => {
        this.authEvent = event;
        console.log('This: ' + this)
        debugger
      });
  }

  ngOnDestroy() {
    this.onAuthUserChanges.unsubscribe();
  }

  goToEventItem(event: Event) {
    this.router.navigate(['/events', event.id])
  }
  // goToDetail(station: StationList) {
  //   this.router.navigate(['/station', station.modo, station.idEstacion]);
  // }

}
