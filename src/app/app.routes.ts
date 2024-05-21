import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/home/home.routes').then((m) => m.routes),
  },
  {
    path: 'athens-plant-nursery',
    loadChildren: () =>
      import(
        './components/athens-plant-nursery/athens-plant-nursery.routes'
      ).then((m) => m.routes),
  },
];
