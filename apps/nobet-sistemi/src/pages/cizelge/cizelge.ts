import { Component, DestroyRef, inject, signal } from '@angular/core';

@Component({
  selector: 'app-cizelge',
  imports: [],
  templateUrl: './cizelge.html',
  styleUrl: './cizelge.css',
})
export class Cizelge {
  protected readonly activeFilter = signal('all');
  protected readonly selectedDay = signal(19);
  protected readonly simulating = signal(false);
  protected readonly toastVisible = signal(false);

  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected simulate() {
    this.simulating.set(true);
    this.timers.push(
      setTimeout(() => {
        this.simulating.set(false);
        this.toastVisible.set(true);
        this.timers.push(setTimeout(() => this.toastVisible.set(false), 3200));
      }, 800),
    );
  }
}
