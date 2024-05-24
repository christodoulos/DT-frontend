import { LngLatLike } from 'mapbox-gl';

export interface IScale {
  x: number;
  y: number;
  z: number;
}

export interface IGLBModel {
  id: string;
  coordinates: LngLatLike;
  elevation: number;
  fileName: string;
  scale: IScale;
  rotation: IScale;
  tooltip: string;
}
