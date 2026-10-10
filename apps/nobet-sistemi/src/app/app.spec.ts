import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { App } from './app';
import { AuthService, Role } from './auth/auth.service';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([{ path: '**', children: [] }])],
    }).compileComponents();
  });

  afterEach(() => TestBed.inject(AuthService).logout());

  async function navLinkCount(role: Role | null) {
    if (role) TestBed.inject(AuthService).login(role, false);
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/nobetlerim');
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    return compiled.querySelectorAll('nav a').length;
  }

  it('giriş yapmamışken alt menüyü göstermez', async () => {
    expect(await navLinkCount(null)).toBe(0);
  });

  it('personel için 4 sekme gösterir', async () => {
    expect(await navLinkCount('user')).toBe(4);
  });

  it('admin için Yönetim sekmesini de gösterir', async () => {
    expect(await navLinkCount('admin')).toBe(5);
  });
});
