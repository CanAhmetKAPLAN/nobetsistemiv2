import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Giriş yapmamış kullanıcıyı login sayfasına yönlendirir
export const authGuard: CanMatchFn = () =>
  inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/login');

// Giriş yapmış kullanıcı login/register sayfasını görmez
export const guestGuard: CanMatchFn = () =>
  !inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/nobetlerim');

// Grubu olmayan kullanıcı önce gruba katılmalı ya da grup kurmalı
export const groupGuard: CanMatchFn = () =>
  inject(AuthService).hasGroup() || inject(Router).parseUrl('/grup-ekle');

// Grubu olan kullanıcı grup ekleme sayfasını görmez
export const noGroupGuard: CanMatchFn = () =>
  !inject(AuthService).hasGroup() || inject(Router).parseUrl('/nobetlerim');
