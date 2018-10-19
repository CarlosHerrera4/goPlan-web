
import { Component, OnInit } from '@angular/core';
import { EventService } from './../../shared/services/event.service';
import { Event } from './../../shared/models/event.model';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  events: Array<Event> = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {
          console.log(events)
          this.events = events;

        });
  }

}
