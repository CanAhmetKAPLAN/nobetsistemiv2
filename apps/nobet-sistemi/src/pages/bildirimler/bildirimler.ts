import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type Category = 'algo' | 'swap' | 'leave' | 'security';
type Filter = 'all' | Category;

@Component({
  selector: 'app-bildirimler',
  imports: [RouterLink],
  templateUrl: './bildirimler.html',
  styleUrl: './bildirimler.css',
})
export class Bildirimler {
  protected readonly filter = signal<Filter>('all');
  protected readonly allRead = signal(false);
  protected readonly swapResponse = signal<'accepted' | 'rejected' | null>(null);

  protected isVisible(category: Category) {
    const f = this.filter();
    return f === 'all' || f === category;
  }

  // Filtre sonrası hiç bildirimi kalmayan gün grubu (Bugün / Dün / ...) gizlenir
  protected anyVisible(categories: Category[]) {
    return categories.some((c) => this.isVisible(c));
  }
}
