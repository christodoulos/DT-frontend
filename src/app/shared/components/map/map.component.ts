import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit {
    mapService = inject(MapService);
    renderer = inject(Renderer2);

    @Input() iframe: string = 'no';
    @ViewChild('mapRef') mapRef: ElementRef;

    ngOnInit() {
        this.mapService.initMap();
        if (this.iframe === 'no') {
            this.mapService.setLocation('attica');
        }
    }

    ngAfterViewInit(): void {
        if (this.iframe === 'yes') {
            this.renderer.setStyle(this.mapRef.nativeElement, 'height', '100vh');
            this.mapService.map.resize();
            this.mapService.setLocation('athens-plant-nursery');
        }
    }
}
