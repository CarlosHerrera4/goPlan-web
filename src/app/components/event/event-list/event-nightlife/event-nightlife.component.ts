import { Event } from './../../../../shared/models/event.model';
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../shared/services/event.service';

@Component({
  selector: 'app-event-nightlife',
  templateUrl: './event-nightlife.component.html',
  styleUrls: ['./event-nightlife.component.css']
})
export class EventNightlifeComponent implements OnInit {

  events: Array<Event> = [];
  finderPattern: string;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // this.eventService.eventsNightlife()
    //   .subscribe(
    //     (events: Array<Event>) => {
    //       console.log(events)
    //       this.events = events
    //     });
  }

  onPatternChange(pattern: string) {
    this.finderPattern = pattern;
  }

}
