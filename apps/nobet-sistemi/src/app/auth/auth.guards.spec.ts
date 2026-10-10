import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { adminGuard } from './admin.guard';
import {
  authGuard,
  groupGuard,
  guestGuard,
  noGroupGuard,
} from './auth.guards';
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

  it('groupGuard: grubu olmayanı grup ekleme sayfasına yönlendirir', () => {
    TestBed.inject(AuthService).login('user', false, false);
    expect(redirectOf(run(groupGuard))).toBe('/grup-ekle');
  });

  it('noGroupGuard: gruba katıldıktan sonra grup ekleme sayfası kapanır', () => {
    const auth = TestBed.inject(AuthService);
    auth.login('user', false, false);
    expect(run(noGroupGuard)).toBe(true);
    auth.joinGroup('admin');
    expect(redirectOf(run(noGroupGuard))).toBe('/nobetlerim');
    expect(auth.isAdmin()).toBe(true);
  });
});
