import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class ConstService {
  constructor() {}

  readonly LOCATIONS: ILocation[] = [
    {
      name: 'farmair',
      center: { lng: 23.8907653285416, lat: 38.1243022118355 },
      zoom: 17,
      bearing: 90,
      pitch: 50,
    },
    {
      name: 'attica',
      center: { lng: 23.70585417391692, lat: 38.01577475657271 },
      zoom: 9.097581678448197,
      pitch: 0,
      bearing: 0,
    },
    {
      name: 'athens-plant-nursery',
      center: { lng: 23.783465732875, lat: 37.9873251405601 },
      zoom: 18,
      pitch: 81,
      bearing: 122,
      glbModels: [
        {
          id: 'sm-tank-1',
          where: { lng: 23.781597756231037, lat: 37.98842485764375 },
          elevation: 0,
          glb: 'tank0',
          scale: { x: 0.125, y: 0.125, z: 0.125 },
          rotation: { x: 180, y: 90, z: 270 },
          castShadow: true,
          tooltip: 'SMU Tank 1',
        },
        {
          id: 'sm-tank-2',
          where: { lng: 23.7819436686587, lat: 37.98854376806914 },
          elevation: 0,
          glb: 'tank0',
          scale: { x: 0.125, y: 0.125, z: 0.125 },
          rotation: { x: 180, y: 90, z: 270 },
          castShadow: true,
          tooltip: 'SMU Tank 2',
        },
        {
          id: 'sm-tank-3',
          where: { lng: 23.78228958108636, lat: 37.988662678494535 },
          elevation: 0,
          glb: 'tank0',
          scale: { x: 0.125, y: 0.125, z: 0.125 },
          rotation: { x: 180, y: 90, z: 270 },
          castShadow: true,
          tooltip: 'SMU Tank 3',
        },
        {
          id: 'tree0',
          where: { lng: 23.7817756050794, lat: 37.9884660930539 },
          elevation: 0,
          glb: 'tree0',
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: 180, y: 90, z: 270 },
          castShadow: true,
          tooltip: 'tree0',
        },
        {
          id: 'tree1',
          where: { lng: 23.7814285202821, lat: 37.9882444002644 },
          elevation: 0,
          glb: 'tree1',
          scale: { x: 1, y: 1, z: 1 },
          rotation: { x: 180, y: 90, z: 270 },
          castShadow: true,
          tooltip: 'tree1',
        },
      ],
    },
    {
      name: 'EMP',
      center: { lng: 23.4, lat: 45.6 },
      zoom: 19,
      bearing: 34.6,
      pitch: 22.4,
    },
  ];
}
