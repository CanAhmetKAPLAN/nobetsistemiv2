import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ExcuseRequest {
  id: number;
  initials: string;
  name: string;
  type: string;
  typeClass: string;
  detail: string;
  points: string;
}

type EngineState = 'idle' | 'running' | 'done';

@Component({
  selector: 'app-yonetim',
  imports: [RouterLink],
  templateUrl: './yonetim.html',
  styleUrl: './yonetim.css',
})
export class Yonetim {
  // Backend bağlanana kadar örnek veri
  protected readonly pendingRequests = signal<ExcuseRequest[]>([
    {
      id: 1,
      initials: 'SD',
      name: 'Dr. Selin Demir',
      type: 'Sağlık Raporu',
      typeClass: 'text-error',
      detail: '4 - 5 Kasım (2 Gün) • Acil Poliklinik',
      points: '-0.50p',
    },
    {
      id: 2,
      initials: 'CŞ',
      name: 'Öğr. Caner Şen',
      type: 'Resmi Görev',
      typeClass: 'text-secondary',
      detail: '10 Kasım Pazar (Sınav Komisyonu)',
      points: '-0.75p',
    },
  ]);
  protected readonly engineState = signal<EngineState>('idle');

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  // Onay ve ret şimdilik sadece talebi listeden düşürür
  protected resolve(id: number) {
    this.pendingRequests.update((list) => list.filter((r) => r.id !== id));
  }

  protected resolveAll() {
    this.pendingRequests.set([]);
  }

  protected runEngine() {
    this.engineState.set('running');
    this.timer = setTimeout(() => this.engineState.set('done'), 1200);
  }
}
