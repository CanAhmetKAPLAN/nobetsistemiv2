import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

// canMatch: admin olmayan kullanıcı için route hiç eşleşmez, sayfa kodu indirilmez
export const adminGuard: CanMatchFn = () =>
  inject(AuthService).isAdmin() || inject(Router).parseUrl('/nobetlerim');
