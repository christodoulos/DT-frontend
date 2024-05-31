import { Injectable, inject } from '@angular/core';
import { ConstService } from './const.service';
import { IGLBModel } from '../interfaces/glbmodel';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    constService = inject(ConstService);
    locations = this.constService.LOCATIONS;

    getModelId(lng: number, lat: number, locationName: string = null): string {
        if (!locationName) {
            for (let i = 0; i < this.locations.length; i++) {
                for (let j = 0; j < this.locations[i].glbModels.length; j++) {
                    if (this.locations[i].glbModels[j].coordinates.lng === lng && this.locations[i].glbModels[j].coordinates.lat === lat) {
                        return this.locations[i].glbModels[j].id;
                    }
                }
            }
            return null;
        } else {
            for (let i = 0; i < this.locations.length; i++) {
                if (this.locations[i].name === locationName) {
                    for (let j = 0; j < this.locations[i].glbModels.length; j++) {
                        if (this.locations[i].glbModels[j].coordinates.lng === lng && this.locations[i].glbModels[j].coordinates.lat === lat) {
                            return this.locations[i].glbModels[j].id;
                        }
                    }
                }
            }
            return null;
        }
    }

    getModel(modelID: string): IGLBModel {
        for (let i = 0; i < this.locations.length; i++) {
            for (let j = 0; j < this.locations[i].glbModels.length; j++) {
                if (this.locations[i].glbModels[j].id === modelID) {
                    return this.locations[i].glbModels[j];
                }
            }
        }
        return null;
    }
}
