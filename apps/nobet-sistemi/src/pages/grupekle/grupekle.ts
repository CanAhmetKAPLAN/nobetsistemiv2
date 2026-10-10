import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../app/auth/auth.service';

type Mode = 'join' | 'create';
type Sector = 'health' | 'security' | 'education' | 'industry';
type JoinState = 'idle' | 'sending' | 'done';

@Component({
  selector: 'app-grupekle',
  imports: [],
  templateUrl: './grupekle.html',
  styleUrl: './grupekle.css',
})
export class Grupekle {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly mode = signal<Mode>('join');
  protected readonly sector = signal<Sector>('health');
  protected readonly verifiedCode = signal<string | null>(null);
  protected readonly codeError = signal(false);
  protected readonly joinState = signal<JoinState>('idle');
  protected readonly createdCode = signal<string | null>(null);

  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected backToLogin() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  protected codeChanged() {
    this.codeError.set(false);
    this.verifiedCode.set(null);
  }

  // Backend gelene kadar boş olmayan her kod geçerli sayılır
  protected verifyCode(raw: string) {
    const code = raw.trim().toUpperCase();
    this.codeError.set(!code);
    this.verifiedCode.set(code || null);
  }

  // Gruba katılan kullanıcı personel olarak uygulamaya geçer
  protected join() {
    this.joinState.set('sending');
    this.later(900, () => {
      this.joinState.set('done');
      this.later(700, () => {
        this.auth.joinGroup('user');
        this.router.navigateByUrl('/nobetlerim');
      });
    });
  }

  // Grubu kuran kişi o grubun amiri (admin) olur ve yönetim paneline geçer
  protected createGroup() {
    this.createdCode.set(`NBT-${Math.floor(1000 + Math.random() * 9000)}`);
    this.later(1800, () => {
      this.auth.joinGroup('admin');
      this.router.navigateByUrl('/yonetim');
    });
  }

  private later(ms: number, fn: () => void) {
    this.timers.push(setTimeout(fn, ms));
  }
}
