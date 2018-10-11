import { EventService } from './../../../shared/services/event.service';
import { Event } from './../../../shared/models/event.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
// export class EventListComponent implements OnInit, OnDestroy {
export class EventListComponent implements OnInit {

  events: Array<Event> = [];
  // onEventsChangesSubscription: Subscription;
  finderPattern: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.list()
      .subscribe(
        (events: Array<Event>) => {
          console.log(events)
          this.events = events
        });
    // this.onEventsChangesSubscription = this.eventService.onUsersChanges()
    //   .subscribe(
    //     (users: Array<User>) => this.users = users
    //   );
  }

  // ngOnDestroy() {
  //   this.onUsersChangesSubscription.unsubscribe();
  // }

  onPatternChange(pattern: string) {
    this.finderPattern = pattern;
  }

}