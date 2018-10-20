
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
  _events: Array<Event> = [];
  _events_: Array<Event> = [];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    // Preferences
    this.eventService.getRandomEvents()
      .subscribe(
        (events: Array<Event>) => {
          // console.log("Plan component" + events[0][0].name)
          // for (i = 0; i < events[0]; i++) {
          //   this.events = events[0]
          // }
          
          let randomEvents = [];
          let firstEvent = events[0];
          let secondEvent = events[1];
          let thirdEvent = events[2];
          randomEvents.push(firstEvent[Math.round(Math.random() * 10)]);
          randomEvents.push(secondEvent[Math.round(Math.random() * 10)])
          randomEvents.push(thirdEvent[Math.round(Math.random() * 10)])

          // this.events = [events[0][1]];
          this.events = randomEvents;
        });

    // Adventure
    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {
          
          let randomEvents = [];
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);

          this._events = randomEvents;
        }
      )

      // Near me
    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {

          let randomEvents = [];
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);

          this._events_ = randomEvents;
        }
      )
  }

  anotherRandomPlan() {
    this.eventService.getRandomEvents()
      .subscribe(
        (events: Array<Event>) => {
          let randomEvents = [];
          let firstEvent = events[0];
          let secondEvent = events[1];
          let thirdEvent = events[2];
          randomEvents.push(firstEvent[Math.round(Math.random() * 10)]);
          randomEvents.push(secondEvent[Math.round(Math.random() * 10)])
          randomEvents.push(thirdEvent[Math.round(Math.random() * 10)])

          this.events = randomEvents;
        });

    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {

          let randomEvents = [];
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);

          this._events = randomEvents;
        }
      )

    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {

          let randomEvents = [];
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);
          randomEvents.push(events[Math.round(Math.random() * events.length)]);

          this._events_ = randomEvents;
        }
      )
  }

}
