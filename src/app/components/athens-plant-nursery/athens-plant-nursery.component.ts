import { Component, inject } from '@angular/core';
import { MapService } from '../../shared/services/map.service';

@Component({
  selector: 'app-athens-plant-nursery',
  standalone: true,
  imports: [],
  templateUrl: './athens-plant-nursery.component.html',
  styleUrl: './athens-plant-nursery.component.css',
})
export class AthensPlantNurseryComponent {
  mapService = inject(MapService);

  ngOnInit() {
    this.mapService.flyTo('athens-plant-nursery');
  }
}
