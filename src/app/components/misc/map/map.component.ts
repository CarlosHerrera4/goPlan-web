import { EventService } from './../../../shared/services/event.service';
import { Event } from './../../../shared/models/event.model';
import { Component, OnInit, ViewChild, Output, Input } from '@angular/core';
import { AgmMap } from '@agm/core';
// import { MapService } from '../../shared/services/map.service';
// import { StaionsMap } from '../../shared/models/staions-map';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  events: Array<Event> = [];
  // stations: Array<StaionsMap>

  @Input() order: string;
  finderPattern: string;

  zoom: number = 13;
  lat: number = 40.431537;
  lng: number = -3.700837;
  @ViewChild(AgmMap) public agmMap: AgmMap
constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.allEvents()
      .subscribe(
        (events: Array<Event>) => {
          console.log(events)
          this.events = events;


        });
        console.log("order: " + this.order)
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

    // this.mapService.getStationsMap(map.getCenter().lng(), map.getCenter().lat()).subscribe(
    //   (stations: StaionsMap[]) => {
    //     this.stations = stations
    //   }
    // )

    console.log(map)

    map.addListener('center_changed', () => {
      // this.stations = [];
      // this.mapService.getStationsMap(map.getCenter().lng(), map.getCenter().lat()).subscribe(
      //   (stations: StaionsMap[]) => {
      //     this.stations = stations
      //   }
      // )

      //   let lng = map.getCenter().lng();
      //   let lat = map.getCenter().lat();



      // });

      // map.addListener("dragend", function () {
      //   //do what you want
      //   console.log("Hola")
    });
  }
}
