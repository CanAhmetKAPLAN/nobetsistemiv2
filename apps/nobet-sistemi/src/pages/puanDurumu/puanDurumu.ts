import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-puan-durumu',
  imports: [],
  templateUrl: './puanDurumu.html',
  styleUrl: './puanDurumu.css',
})
export class PuanDurumu {
  protected readonly simOpen = signal(false);
}
