import { AnchorType } from '../types/threebox';
import { ICoordinates } from './coordinates';

export interface IScale {
  x: number;
  y: number;
  z: number;
}

export interface IGLBModel {
  id: string;
  coordinates: ICoordinates;
  elevation: number;
  fileName: string;
  scale: IScale;
  rotation: IScale;
  anchor: AnchorType;
  tooltip: string;
}
