import { LngLatLike } from 'mapbox-gl';
import { IGLBModel } from './glbmodel';

export interface ILocation {
  name: string;
  center: LngLatLike;
  zoom: number;
  bearing: number;
  pitch: number;
  glbModels: IGLBModel[];
}
