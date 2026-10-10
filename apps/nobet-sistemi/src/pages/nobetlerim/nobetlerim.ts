import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nobetlerim',
  imports: [RouterLink],
  templateUrl: './nobetlerim.html',
  styleUrl: './nobetlerim.css',
})
export class Nobetlerim {
  protected readonly orgMenuOpen = signal(false);
  protected readonly currentOrg = signal('Şehir Hastanesi / Acil Nöbet');

  protected selectOrg(org: string) {
    this.currentOrg.set(org);
    this.orgMenuOpen.set(false);
  }
}
