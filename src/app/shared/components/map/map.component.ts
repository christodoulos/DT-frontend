import { Component, OnInit, inject } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
  mapService = inject(MapService);

  ngOnInit() {
    this.mapService.initMap();
    this.mapService.setLocation('attica');
  }
}
