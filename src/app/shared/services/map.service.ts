import { Injectable, inject } from '@angular/core';
import { Map, NavigationControl, ScaleControl } from 'mapbox-gl';
import { ConstService } from './const.service';
import { ILocation } from '../interfaces/location';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: Map;
  mapInitialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  constService = inject(ConstService);

  constructor() {}

  initMap() {
    this.map = new Map({
      container: 'map',
      style: 'mapbox://styles/christodoulos/clqjoryfl00o301qvhaat7oj4',
      antialias: true,
      attributionControl: false,
      preserveDrawingBuffer: true,
      bearingSnap: 0,
      pitch: 0,
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    });

    // Add zoom and rotation controls to the map.
    this.map.addControl(new NavigationControl());
    this.map.addControl(new ScaleControl());
    // this.map.scrollZoom.disable();

    console.log('MapService.initializeMap Mapbox initialized');
    this.mapInitialized.next(true);
  }

  flyTo(locationName: string) {
    const location: ILocation = this.constService.LOCATIONS.find(
      (loc) => loc.name === locationName,
    );
    if (location) {
      this.map.flyTo({
        center: location.center,
        zoom: location.zoom,
        pitch: location.pitch,
        bearing: location.bearing,
      });
    }
  }
}
