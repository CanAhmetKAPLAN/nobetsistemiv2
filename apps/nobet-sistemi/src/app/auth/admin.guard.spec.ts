import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { adminGuard } from './admin.guard';
import { AuthService } from './auth.service';

describe('adminGuard', () => {
  const run = () =>
    TestBed.runInInjectionContext(() => adminGuard({} as never, []));

  it('admin için route eşleşir', () => {
    TestBed.inject(AuthService).setRole('admin');
    expect(run()).toBe(true);
  });

  it('admin olmayanı nöbetlerim sayfasına yönlendirir', () => {
    TestBed.inject(AuthService).setRole('user');
    const result = run() as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/nobetlerim');
  });
});
