import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-puan-durumu',
  imports: [RouterLink],
  templateUrl: './puanDurumu.html',
  styleUrl: './puanDurumu.css',
})
export class PuanDurumu {
  protected readonly simOpen = signal(false);
}
