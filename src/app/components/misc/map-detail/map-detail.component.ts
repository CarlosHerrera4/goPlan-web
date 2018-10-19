import { EventService } from './../../../shared/services/event.service';
import { Event } from './../../../shared/models/event.model';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { AgmMap } from '@agm/core';
import { ActivatedRoute, Params } from '@angular/router';

// import { MapService } from '../../shared/services/map.service';
// import { StaionsMap } from '../../shared/models/staions-map';
@Component({
  selector: 'app-map-detail',
  templateUrl: './map-detail.component.html',
  styleUrls: ['./map-detail.component.css']
})
export class MapDetailComponent implements OnInit {

  _event: Event;
  idParam: string;
  // stations: Array<StaionsMap>

  @Input() order: string;
  finderPattern: string;

  zoom: number = 13;
  lat: number = 40.431537;
  lng: number = -3.700837;
  @ViewChild(AgmMap) public agmMap: AgmMap
constructor(
  private eventService: EventService,
  private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.idParam = params['id'];
      console.log("Params: " + this.idParam)
    });
    this.eventService.getEvent(this.idParam).subscribe((event: Event) => {
      this._event = event[0];
      this.lat = event[0].location.coordinates[1];
      this.lng = event[0].location.coordinates[0];
      this.zoom = 18;
      console.log("Evento: " + event.name)

      // document.getElementById('description').innerHTML = event[0].description;
    });
  }

  boundsChange(event) {
    // console.log(event);
  }

  onPatternChange(pattern: string) {
    this.finderPattern = pattern;
  }

  mapReady(map) {

    setTimeout(() => {
      console.log(map.getBounds());
    }, 0);


    console.log(map)

    map.addListener('center_changed', () => {

    });
  }
}
