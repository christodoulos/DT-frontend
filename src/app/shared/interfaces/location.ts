export interface ILocation {
  name: string;
  center: { lng: number; lat: number };
  zoom: number;
  bearing: number;
  pitch: number;
  glbModels?: any[];
}
