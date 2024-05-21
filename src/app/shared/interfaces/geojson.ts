import {
  Feature as GeoJSONFeature,
  FeatureCollection as GeoJSONFeatureCollection,
} from 'geojson';

export enum GeometryType {
  Point = 'Point',
  LineString = 'LineString',
  Polygon = 'Polygon',
  MultiPolygon = 'MultiPolygon',
}

export interface Geometry {
  type:
    | GeometryType.Point
    | GeometryType.LineString
    | GeometryType.Polygon
    | GeometryType.MultiPolygon;
  coordinates: any[];
}

export interface Feature extends GeoJSONFeature {
  _id: string;
  id?: string;
  type: 'Feature';
  geometry: Geometry;
  properties: Record<string, any>;
}

export interface FeatureCollection extends GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
  // id: string;
  // _id: string;
  properties: Record<string, any>;
}
