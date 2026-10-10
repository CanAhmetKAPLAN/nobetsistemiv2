import { Injectable, computed, signal } from '@angular/core';

export type Role = 'admin' | 'user';

const STORAGE_KEY = 'nobetpro.role';

// Gerçek giriş sistemi gelene kadar rol yerel olarak tutulur.
// Backend bağlandığında sadece bu servisin içi değişmeli; guard ve menü aynı kalır.
@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly role = signal<Role>(readStoredRole());
  readonly isAdmin = computed(() => this.role() === 'admin');

  setRole(role: Role) {
    this.role.set(role);
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {
      // depolama kapalıysa rol sadece bu oturumda geçerli
    }
  }
}

function readStoredRole(): Role {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'admin' ? 'admin' : 'user';
  } catch {
    return 'user';
  }
}
