import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/auth/auth.service';

type AlgoMode = 'balanced' | 'weekend' | 'weekday';

@Component({
  selector: 'app-profil',
  imports: [RouterLink],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly algoMode = signal<AlgoMode>('balanced');
  protected readonly maxShifts = signal(8);
  protected readonly copied = signal(false);

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected async copyInviteCode(code: string) {
    try {
      await navigator.clipboard.writeText(code.trim());
    } catch {
      // panoya erişim yoksa da geri bildirimi göster
    }
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }

  protected logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
