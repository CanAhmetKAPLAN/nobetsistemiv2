import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'nobetlerim' },
  {
    path: 'nobetlerim',
    title: 'Nöbetlerim',
    loadComponent: () =>
      import('../pages/nobetlerim/nobetlerim').then((m) => m.Nobetlerim),
  },
  {
    path: 'cizelge',
    title: 'Çizelge',
    loadComponent: () =>
      import('../pages/cizelge/cizelge').then((m) => m.Cizelge),
  },
  {
    path: 'puan-durumu',
    title: 'Puan Durumu',
    loadComponent: () =>
      import('../pages/puanDurumu/puanDurumu').then((m) => m.PuanDurumu),
  },
  {
    path: 'degisim-izin',
    title: 'Değişim & İzin',
    loadComponent: () =>
      import('../pages/degisim-izin/degisim-izin').then((m) => m.DegisimIzin),
  },
  {
    path: 'degisim-izin/mazeret-talebi',
    title: 'Mazeret Talebi',
    data: { hideNav: true },
    loadComponent: () =>
      import('../pages/mazeret-talebi/mazeret-talebi').then(
        (m) => m.MazeretTalebi,
      ),
  },
  { path: '**', redirectTo: 'nobetlerim' },
];
