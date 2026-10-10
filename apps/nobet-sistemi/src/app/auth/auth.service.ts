import { Injectable, computed, signal } from '@angular/core';

export type Role = 'admin' | 'user';

interface Session {
  role: Role;
  hasGroup: boolean;
}

const STORAGE_KEY = 'nobetpro.session';

// Gerçek giriş sistemi gelene kadar oturum tarayıcıda tutulur.
// "Beni hatırla" seçiliyse localStorage, değilse sekme kapanana kadar sessionStorage.
// Backend bağlandığında sadece bu servisin içi değişmeli; guard'lar ve menü aynı kalır.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session = signal<Session | null>(readSession());

  readonly isLoggedIn = computed(() => this.session() !== null);
  readonly role = computed<Role>(() => this.session()?.role ?? 'user');
  readonly isAdmin = computed(() => this.role() === 'admin');
  readonly hasGroup = computed(() => this.session()?.hasGroup ?? false);

  // Mevcut kullanıcıların grubu var sayılır; yeni kayıtta grup sonradan seçilebilir
  login(role: Role, remember: boolean, hasGroup = true) {
    const session: Session = { role, hasGroup };
    this.session.set(session);
    clearStoredSession();
    write(remember ? 'local' : 'session', JSON.stringify(session));
  }

  // Gruba katılan personel olur, yeni grup kuran o grubun amiri (admin) olur
  joinGroup(role: Role) {
    this.update({ role, hasGroup: true });
  }

  logout() {
    this.session.set(null);
    clearStoredSession();
  }

  // Geliştirme düğmesi için: oturumu koruyarak rolü değiştirir
  setRole(role: Role) {
    this.update({ role });
  }

  private update(patch: Partial<Session>) {
    const current = this.session();
    if (!current) return;
    const next = { ...current, ...patch };
    this.session.set(next);
    write(read('local') ? 'local' : 'session', JSON.stringify(next));
  }
}

type StorageKind = 'local' | 'session';

function storage(kind: StorageKind): Storage {
  return kind === 'local' ? localStorage : sessionStorage;
}

function read(kind: StorageKind): string | null {
  try {
    return storage(kind).getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function write(kind: StorageKind, value: string) {
  try {
    storage(kind).setItem(STORAGE_KEY, value);
  } catch {
    // depolama kapalıysa oturum sadece bellekte kalır
  }
}

function clearStoredSession() {
  for (const kind of ['local', 'session'] as const) {
    try {
      storage(kind).removeItem(STORAGE_KEY);
    } catch {
      // yok say
    }
  }
}

function readSession(): Session | null {
  const raw = read('local') ?? read('session');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Session>;
    return parsed.role === 'admin' || parsed.role === 'user'
      ? { role: parsed.role, hasGroup: parsed.hasGroup ?? true }
      : null;
  } catch {
    return null;
  }
}
