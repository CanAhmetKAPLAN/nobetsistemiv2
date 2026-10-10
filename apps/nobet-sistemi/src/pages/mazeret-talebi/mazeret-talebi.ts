import { Location } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

type Reason = 'annual' | 'health' | 'official' | 'personal';
type Scope = 'full' | 'part';
type SubmitState = 'idle' | 'sending' | 'sent';

@Component({
  selector: 'app-mazeret-talebi',
  imports: [RouterLink],
  templateUrl: './mazeret-talebi.html',
  styleUrl: './mazeret-talebi.css',
})
export class MazeretTalebi {
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  protected readonly reason = signal<Reason>('health');
  protected readonly scope = signal<Scope>('full');
  protected readonly submitState = signal<SubmitState>('idle');

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected goBack() {
    // Sayfa doğrudan açıldıysa geri gidilecek uygulama içi geçmiş yok
    if (this.router.lastSuccessfulNavigation()?.previousNavigation) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/degisim-izin');
    }
  }

  protected submit() {
    this.submitState.set('sending');
    this.timer = setTimeout(() => this.submitState.set('sent'), 700);
  }
}
