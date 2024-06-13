import { Injectable, inject } from '@angular/core';
import { CustomLayerInterface, LngLatLike, Map, NavigationControl, Popup, ScaleControl } from 'mapbox-gl';
import { Threebox } from 'threebox-plugin';
import { ConstService } from './const.service';
import { ILocation } from '../interfaces/location';
import { BehaviorSubject, Subject } from 'rxjs';
import { AnchorType, ThreeDType } from '../types/threebox';
import { IGLBModel } from '../interfaces/glbmodel';
import { UtilsService } from './utils.service';

declare global {
    interface Window {
        tb: any;
    }
}

window.tb = window.tb || {};

@Injectable({
    providedIn: 'root',
})
export class MapService {
    map: Map;
    mapInitialized = new BehaviorSubject<boolean>(false);
    apnPLCModelClicked = new Subject<string>();

    tb = window.tb;

    constService = inject(ConstService);
    utilsService = inject(UtilsService);

    initMap() {
        this.map = new Map({
            container: 'map',
            style: 'mapbox://styles/christodoulos/clqjoryfl00o301qvhaat7oj4',
            antialias: true,
            attributionControl: false,
            preserveDrawingBuffer: true,
            bearingSnap: 0,
            pitch: 0,
            accessToken: 'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
        });

        // Add zoom and rotation controls to the map.
        // this.map.addControl(new NavigationControl());
        this.map.addControl(new ScaleControl());
        // this.map.scrollZoom.disable();

        console.log('Mapbox initialized');

        this.map.on('load', () => {
            this.mapInitialized.next(true);
        });

        window.tb = this.tb = new Threebox(this.map, this.map.getCanvas().getContext('webgl'), {
            willReadFrequently: true,
            sky: true,
            terrain: true,
            defaultLights: true,
            realSunlight: true,
            enableSelectingObjects: true,
            enableDraggingObjects: true,
            enableHelpTooltips: true,
        });

        console.log('Threebox initialized');
    }

    flyTo(locationName: string): Promise<ILocation> {
        return new Promise((resolve, reject) => {
            const location: ILocation = this.constService.LOCATIONS.find((loc) => loc.name === locationName);

            if (!location) reject('Location not found');

            if (!this.map) reject('Map is not initialized');

            this.map.flyTo({
                center: location.center,
                zoom: location.zoom,
                pitch: location.pitch,
                bearing: location.bearing,
            });
            this.map.once('moveend', () => {
                resolve(location);
            });
        });
    }

    async setLocation(name: string) {
        const location: ILocation = await this.flyTo(name);

        if (location.glbModels.length > 0) {
            const layers: CustomLayerInterface[] = await this.addGLBModels(location.glbModels);
            for (const layer of layers) {
                this.map.addLayer(layer);
            }
        }
    }

    leaveLocation(name: string) {
        const location: ILocation = this.constService.LOCATIONS.find((loc) => loc.name === name);
        if (location.glbModels.length > 0) {
            for (const model of location.glbModels) {
                this.map.removeLayer(`glb-model-${model.id}`);
            }
            this.tb.clear();
        }
    }

    glbLayer(
        id: string,
        where: { lng: number; lat: number },
        elevation: number,
        modelFile: string,
        scale: ThreeDType,
        rotation: ThreeDType,
        anchor: AnchorType = 'bottom-left',
        modelToolTip: string = '',
    ): Promise<CustomLayerInterface> {
        return new Promise((resolve, reject) => {
            if (!this.tb || !this.map) reject('Threebox and/or Mapbox is not initialized');

            const options = {
                obj: modelFile,
                type: 'gltf',
                scale,
                units: 'meters',
                rotation,
                anchor,
            };

            this.tb.loadObj(options, async (model: any) => {
                const terrainElevation = await this.getTerrainElevation(where.lng, where.lat);
                console.log(`Map elevation at (${where.lng} ${where.lat}) is ${terrainElevation} meters`);

                const pos = [where.lng, where.lat, elevation + terrainElevation];
                model.setCoords(pos);

                model.addEventListener('SelectedChange', this.onSelectedChange.bind(this), false);
                // model.addEventListener('ObjectMouseOver', this.onObjectMouseOver.bind(this), false);
                // model.addEventListener('ObjectMouseOut', this.onObjectMouseOut.bind(this), false);

                if (modelToolTip) model.addTooltip(modelToolTip, true);
                model.modelCastShadow = true;

                this.tb.lights.dirLight.target = model;

                const customLayer: CustomLayerInterface = {
                    id: `glb-model-${id}`,
                    type: 'custom',
                    renderingMode: '3d',
                    onAdd: () => {
                        this.tb.add(model);
                    },
                    render: () => {
                        this.tb.update();
                    },
                };
                resolve(customLayer);
            });
        });
    }

    onObjectMouseOver(event: any) {
        console.log('MOUSE OVER', event);
    }

    onObjectMouseOut(event: any) {
        console.log('Mouse OUT', event);
    }

    onSelectedChange(event: any) {
        let selectedObject = event.detail;
        console.log('Selected object:', selectedObject);

        let selectedValue = selectedObject.selected;
        if (selectedValue) {
            const [lng, lat, alt] = selectedObject.coordinates;
            console.log(selectedObject);
            console.log('Selected object:', lng, lat, alt);
            const modelID = this.utilsService.getModelId(lng, lat);
            if (modelID === 'apn-unit') {
                this.apnPLCModelClicked.next(modelID);
            }
            console.log('Selected object:', modelID);
            const model: IGLBModel = this.utilsService.getModel(modelID);
        } else {
            console.log('No object selected');
        }
    }

    getTerrainElevation(lng: number, lat: number): Promise<number> {
        return new Promise((resolve, reject) => {
            if (!this.map) {
                reject('Map is not initialized');
                return;
            }

            const coordinates: LngLatLike = [lng, lat];

            if (!this.map.isMoving() && !this.map.isZooming()) {
                const elevation = this.map!.queryTerrainElevation(coordinates, { exaggerated: true }) ?? 0;
                resolve(elevation);
            } else {
                this.map.once('moveend', () => {
                    const elevation =
                        this.map!.queryTerrainElevation(coordinates, {
                            exaggerated: true,
                        }) ?? 0;
                    resolve(elevation);
                });
            }
        });
    }

    async addGLBModels(models: IGLBModel[]): Promise<CustomLayerInterface[]> {
        console.log('addGLBModels', models);
        const promises: CustomLayerInterface[] = [];
        for (const model of models) {
            promises.push(
                await this.glbLayer(
                    model.id,
                    model.coordinates,
                    model.elevation,
                    `/assets/glbs/${model.fileName}.glb`,
                    model.scale,
                    model.rotation,
                    model.anchor,
                    model.tooltip,
                ),
            );
        }
        return Promise.all(promises);
    }
}
