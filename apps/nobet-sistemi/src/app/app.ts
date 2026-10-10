import { Component, computed, inject, isDevMode } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from './auth/auth.service';

const NAV_ITEMS = [
  { path: '/nobetlerim', icon: 'event_available', label: 'Nöbetlerim' },
  { path: '/cizelge', icon: 'calendar_month', label: 'Çizelge' },
  { path: '/puan-durumu', icon: 'leaderboard', label: 'Puan Durumu' },
  { path: '/degisim-izin', icon: 'swap_horizontal_circle', label: 'Değişim & İzin' },
];
const ADMIN_NAV_ITEM = { path: '/yonetim', icon: 'admin_panel_settings', label: 'Yönetim' };

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  protected readonly auth = inject(AuthService);
  protected readonly devMode = isDevMode();

  protected readonly navItems = computed(() =>
    this.auth.isAdmin() ? [...NAV_ITEMS, ADMIN_NAV_ITEM] : NAV_ITEMS,
  );

  // Route data'sında hideNav olan sayfalarda (ör. mazeret talebi) alt menü gizlenir
  protected readonly showNav = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        return !route.data['hideNav'];
      }),
    ),
    { initialValue: true },
  );

  // Sadece geliştirme ortamında: giriş sistemi gelene kadar rolü denemek için
  protected toggleRole() {
    const next = this.auth.isAdmin() ? 'user' : 'admin';
    this.auth.setRole(next);
    if (next === 'user' && this.router.url.startsWith('/yonetim')) {
      this.router.navigateByUrl('/nobetlerim');
    }
  }
}
