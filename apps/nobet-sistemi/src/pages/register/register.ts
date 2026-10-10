import { Location } from '@angular/common';
import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

type Sector = 'health' | 'education' | 'security' | 'other';
type SubmitState = 'idle' | 'sending' | 'done';

interface Strength {
  score: number;
  label: string;
  labelClass: string;
  barClass: string;
}

const STRENGTH_LEVELS: Strength[] = [
  { score: 0, label: 'En az 8 karakter', labelClass: 'text-on-surface-variant', barClass: '' },
  { score: 1, label: 'Zayıf', labelClass: 'text-error', barClass: 'bg-error' },
  { score: 2, label: 'Orta', labelClass: 'text-secondary', barClass: 'bg-secondary-container' },
  { score: 3, label: 'İyi', labelClass: 'text-primary', barClass: 'bg-primary' },
  { score: 4, label: 'Çok Güçlü ✓', labelClass: 'text-tertiary', barClass: 'bg-tertiary' },
];

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  protected readonly sector = signal<Sector>('health');
  protected readonly password = signal('');
  protected readonly showPassword = signal(false);
  protected readonly submitState = signal<SubmitState>('idle');

  protected readonly strength = computed(() => {
    const val = this.password();
    if (!val) return STRENGTH_LEVELS[0];
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-ZÇĞİÖŞÜ]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return STRENGTH_LEVELS[score];
  });

  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected goBack() {
    this.location.back();
  }

  // Backend gelene kadar kayıt talebi sadece onaylanmış gibi gösterilir, sonra girişe dönülür
  protected submit() {
    this.submitState.set('sending');
    this.timers.push(
      setTimeout(() => {
        this.submitState.set('done');
        this.timers.push(
          setTimeout(() => this.router.navigateByUrl('/login'), 1200),
        );
      }, 900),
    );
  }
}
