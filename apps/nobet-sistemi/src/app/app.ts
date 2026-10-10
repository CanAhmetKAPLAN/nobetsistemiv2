import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly navItems = [
    { path: '/nobetlerim', icon: 'event_available', label: 'Nöbetlerim' },
    { path: '/cizelge', icon: 'calendar_month', label: 'Çizelge' },
    { path: '/puan-durumu', icon: 'leaderboard', label: 'Puan Durumu' },
    { path: '/degisim-izin', icon: 'swap_horizontal_circle', label: 'Değişim & İzin' },
  ];
}
