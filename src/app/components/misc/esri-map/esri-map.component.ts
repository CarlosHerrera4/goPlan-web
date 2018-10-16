/*
  Copyright 2018 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import esri = __esri;
import { Event } from './../../../shared/models/event.model';
import { EventService } from './../../../shared/services/event.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['./esri-map.component.css']
})
export class EsriMapComponent implements OnInit {

  @Output() mapLoaded = new EventEmitter<boolean>();
  @ViewChild('mapViewNode') private mapViewEl: ElementRef;
  @Input() events: Array<Event> = [];
  @Input () order; 

  /**
   * @private _zoom sets map zoom
   * @private _center sets map center
   * @private _basemap sets type of map
   */
  private _zoom: number = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap: string = 'dark-gray';

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor( private eventService: EventService ) { }

  async initializeMap() {
    try {
      const [
        EsriMap, 
        EsriMapView,
        SceneView,
        GraphicsLayer,
        Graphic
      ] = await loadModules([
        'esri/Map',
        'esri/views/MapView',
        'esri/views/SceneView',
        'esri/layers/GraphicsLayer',
        'esri/Graphic'
      ]);

      // Set type of map
      const mapProperties: esri.MapProperties = {
        basemap: this._basemap
      };

      const map: esri.Map = new EsriMap(mapProperties);

      // Set type of map view
      const mapViewProperties: esri.MapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: this._center,
        zoom: this._zoom,
        map: map
      };

      // const mapView: esri.MapView = new EsriMapView(mapViewProperties);
      const mapView: esri.SceneView = new SceneView(mapViewProperties);
      
      let point = {
        type: "point", // autocasts as new Point()
        x: -0.178,
        y: 51.48791,
        z: 1010
      };
      let markerSymbol = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: { // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      };

      let pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      });

      let graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);
      graphicsLayer.add(pointGraphic);

      // this.eventService.allEvents()
      //   .subscribe(
      //     (events: Array<Event>) => {
      //       this.events = events;
      //     }
      //   )
      // All resources in the MapView and the map have loaded.
      // Now execute additional processes
      mapView.when(() => {
        debugger
        this.mapLoaded.emit(true);
      });
    } catch (error) {
      console.log('We have an error: ' + error);
    }

  }

  ngOnInit() {
    this.initializeMap();
  }

}
