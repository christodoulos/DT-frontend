import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MapService } from '../../shared/services/map.service';
import { ConstService } from '../../shared/services/const.service';
import { AnySourceData, Popup } from 'mapbox-gl';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
    mapService = inject(MapService);
    constService = inject(ConstService);
    router = inject(Router);
    map = this.mapService.map;
    pins = this.constService.WELCOME_PINS;
    potentialRoute = '';

    popup = new Popup({
        closeButton: false,
        closeOnClick: false,
        maxWidth: '500px',
    });

    ngOnInit(): void {
        this.mapService.mapInitialized.subscribe((mapInitialized: boolean) => {
            if (mapInitialized) {
                this.showPins();
                this.map.on('mouseenter', 'places', (e: any) => {
                    // Change the cursor style as a UI indicator.
                    this.map.getCanvas().style.cursor = 'pointer';

                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const description = e.features[0].properties.description;
                    // Be prepared for a route change.
                    this.potentialRoute = e.features[0].properties.route;

                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }

                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    this.popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
                });

                this.map.on('mouseleave', 'places', () => {
                    this.map.getCanvas().style.cursor = '';
                    this.popup.remove();
                });

                this.map.on('dblclick', this.ondblclick);
                this.map.on('touchmove', this.ondblclick);
            }
        });
    }

    ngOnDestroy(): void {
        if (this.map.getLayer('points')) this.map.removeLayer('points');
        if (this.map.getLayer('places')) this.map.removeLayer('places');
        if (this.map.getSource('pins')) this.map.removeSource('pins');
        // TODO: Remove event listeners like dblclick with a NAMED function.
        this.map.off('mouseenter', 'places', () => {});
        this.map.off('mouseleave', 'places', () => {});
        this.map.off('dblclick', this.ondblclick);
    }

    ondblclick = (e: any) => {
        e.preventDefault();
        this.popup.remove();
        this.router.navigateByUrl(this.potentialRoute);
    };

    showPins() {
        this.map.addSource('pins', this.pins as AnySourceData);
        this.map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'pins',
            layout: {
                'icon-image': 'custom-marker',
                'icon-allow-overlap': true,
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-size': 16,
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
                'text-offset': [0, 1.25],
                'text-anchor': 'top',
                'icon-offset': [0, -30],
            },
            paint: {
                'text-color': '#ffffff',
                'text-halo-color': '#4264fb',
                'text-halo-width': 2,
            },
        });
        this.map.addLayer({
            id: 'places',
            type: 'circle',
            source: 'pins',
            paint: {
                'circle-color': '#4264fb',
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
            },
        });
    }
}
