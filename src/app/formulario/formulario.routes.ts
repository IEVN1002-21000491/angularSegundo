import { Routes } from "@angular/router";

// Si estás exportando el componente con un export por nombre, como es habitual en Angular
export default [
  {
    path: 'zodiaco',
    loadComponent: () => import('./zodiaco/zodiaco.component'),
  },
  {
    path: 'ejemplo1',
    loadComponent: () => import('./ejemplo1/ejemplo1.component'),
  },
] as Routes;
