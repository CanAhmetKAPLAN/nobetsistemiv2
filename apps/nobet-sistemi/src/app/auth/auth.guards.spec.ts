import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { adminGuard } from './admin.guard';
import { authGuard, guestGuard } from './auth.guards';
import { AuthService } from './auth.service';

describe('auth guards', () => {
  const run = (guard: typeof adminGuard) =>
    TestBed.runInInjectionContext(() => guard({} as never, []));
  const redirectOf = (result: unknown) =>
    TestBed.inject(Router).serializeUrl(result as UrlTree);

  afterEach(() => TestBed.inject(AuthService).logout());

  it('adminGuard: admin için eşleşir', () => {
    TestBed.inject(AuthService).login('admin', false);
    expect(run(adminGuard)).toBe(true);
  });

  it('adminGuard: personeli nöbetlerim sayfasına yönlendirir', () => {
    TestBed.inject(AuthService).login('user', false);
    expect(redirectOf(run(adminGuard))).toBe('/nobetlerim');
  });

  it('authGuard: giriş yapmamışı login sayfasına yönlendirir', () => {
    expect(redirectOf(run(authGuard))).toBe('/login');
  });

  it('authGuard: giriş yapmış kullanıcı için eşleşir', () => {
    TestBed.inject(AuthService).login('user', false);
    expect(run(authGuard)).toBe(true);
  });

  it('guestGuard: giriş yapmış kullanıcıyı login sayfasından uzak tutar', () => {
    TestBed.inject(AuthService).login('user', false);
    expect(redirectOf(run(guestGuard))).toBe('/nobetlerim');
  });
});
