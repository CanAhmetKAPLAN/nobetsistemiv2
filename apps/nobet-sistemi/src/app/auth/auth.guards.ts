import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// Giriş yapmamış kullanıcıyı login sayfasına yönlendirir
export const authGuard: CanMatchFn = () =>
  inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/login');

// Giriş yapmış kullanıcı login/register sayfasını görmez
export const guestGuard: CanMatchFn = () =>
  !inject(AuthService).isLoggedIn() || inject(Router).parseUrl('/nobetlerim');
