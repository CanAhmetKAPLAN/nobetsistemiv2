import { Component, DestroyRef, inject, signal } from '@angular/core';

type Tab = 'takas' | 'mazeret' | 'onay';
type SwapCardState = 'open' | 'accepted' | 'rejected' | 'removed';

@Component({
  selector: 'app-degisim-izin',
  imports: [],
  templateUrl: './degisim-izin.html',
  styleUrl: './degisim-izin.css',
})
export class DegisimIzin {
  protected readonly activeTab = signal<Tab>('takas');
  protected readonly swapCard = signal<SwapCardState>('open');
  protected readonly swapModalOpen = signal(false);

  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected acceptSwap() {
    this.swapCard.set('accepted');
    this.timers.push(setTimeout(() => this.swapCard.set('removed'), 1200));
  }

  protected rejectSwap() {
    this.swapCard.set('rejected');
    this.timers.push(setTimeout(() => this.swapCard.set('removed'), 300));
  }

  protected publishTrade() {
    this.swapModalOpen.set(false);
    alert('Takas talebiniz havuzda başarıyla yayınlandı!');
  }

  protected addConstraint() {
    alert(
      'Algoritma kısıtı kaydedildi. Yeni oluşturulacak çizelgelerde bu tarihler kilitli tutulacaktır.',
    );
  }
}
