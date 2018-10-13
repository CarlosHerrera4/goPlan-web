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
    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {
          console.log(events)
          this.events = events;

          
        });
  }

  showTable() {
    document.getElementById('regionTable').style.display = 'block';
    document.getElementById('regionMap').style.display = 'none';
  }

  showMap() {
    document.getElementById('regionMap').style.display = 'block';
    document.getElementById('regionTable').style.display = 'none';
  }


  onPatternChange(pattern: string) {
    this.finderPattern = pattern;
  }

}
