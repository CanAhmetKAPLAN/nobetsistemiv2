import { Route } from '@angular/router';
import { adminGuard } from './auth/admin.guard';
import {
  authGuard,
  groupGuard,
  guestGuard,
  noGroupGuard,
} from './auth/auth.guards';

export const appRoutes: Route[] = [
  {
    path: 'login',
    title: 'Giriş Yap',
    canMatch: [guestGuard],
    data: { hideNav: true },
    loadComponent: () => import('../pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    title: 'Kayıt Ol',
    canMatch: [guestGuard],
    data: { hideNav: true },
    loadComponent: () =>
      import('../pages/register/register').then((m) => m.Register),
  },
  {
    // Yeni üye: davet koduyla gruba katılır ya da yeni grup kurar
    path: 'grup-ekle',
    title: 'Grup Ekle',
    canMatch: [authGuard, noGroupGuard],
    data: { hideNav: true },
    loadComponent: () =>
      import('../pages/grupekle/grupekle').then((m) => m.Grupekle),
  },
  {
    // Buradaki tüm sayfalar giriş ve bir gruba üyelik gerektirir
    path: '',
    canMatch: [authGuard, groupGuard],
    children: [
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
          import('../pages/degisim-izin/degisim-izin').then(
            (m) => m.DegisimIzin,
          ),
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
      {
        path: 'profil',
        title: 'Profil & Ayarlar',
        loadComponent: () =>
          import('../pages/profil/profil').then((m) => m.Profil),
      },
      {
        path: 'yonetim',
        title: 'Yönetim',
        canMatch: [adminGuard],
        loadComponent: () =>
          import('../pages/yonetim/yonetim').then((m) => m.Yonetim),
      },
      { path: '**', redirectTo: 'nobetlerim' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
