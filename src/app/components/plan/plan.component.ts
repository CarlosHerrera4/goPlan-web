
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
    this.eventService.getRandomEvents()
      .subscribe(
        (events: Array<Event>) => {
          // console.log("Plan component" + events[0][0].name)
          // for (i = 0; i < events[0]; i++) {
          //   this.events = events[0]
          // }
          debugger
          let randomEvents = [];
          let firstEvent = events[0];
          randomEvents.push(firstEvent[Math.round(Math.random() * 10)])
          // this.events = [events[0][1]];
          this.events = randomEvents;
        });
  }

}
