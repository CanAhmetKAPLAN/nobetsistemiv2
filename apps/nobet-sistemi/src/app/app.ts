import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  protected readonly navItems = [
    { path: '/nobetlerim', icon: 'event_available', label: 'Nöbetlerim' },
    { path: '/cizelge', icon: 'calendar_month', label: 'Çizelge' },
    { path: '/puan-durumu', icon: 'leaderboard', label: 'Puan Durumu' },
    { path: '/degisim-izin', icon: 'swap_horizontal_circle', label: 'Değişim & İzin' },
  ];

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
}
