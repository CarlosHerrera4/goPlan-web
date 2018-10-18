import { Event } from './../../../shared/models/event.model';
import { EventService } from './../../../shared/services/event.service';
import { Component, OnInit, Output, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event;
  activatedRoute: ActivatedRoute;
  constructor(
    // private activatedRoute: ActivatedRoute,
    private eventService: EventService

  ) { }
  idParam: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params['id'];
      console.log("Params: " + this.idParam)
    });
    
    this.eventService.getEvent(this.idParam).subscribe((event: Event) => {
      this.event = event;
      console.log("Evento: " + event)
    });
  }

}
