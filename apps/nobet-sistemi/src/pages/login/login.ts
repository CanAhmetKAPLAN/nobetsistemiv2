import { Location } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, Role } from '../../app/auth/auth.service';

type SubmitState = 'idle' | 'sending' | 'done';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  protected readonly role = signal<Role>('user');
  protected readonly showPassword = signal(false);
  protected readonly submitState = signal<SubmitState>('idle');

  private readonly timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.timers.forEach(clearTimeout));
  }

  protected goBack() {
    this.location.back();
  }

  // Backend gelene kadar her T.C./şifre kabul edilir; seçilen rolle oturum açılır
  protected submit(remember: boolean) {
    this.submitState.set('sending');
    this.timers.push(
      setTimeout(() => {
        this.submitState.set('done');
        this.auth.login(this.role(), remember);
        this.timers.push(
          setTimeout(
            () =>
              this.router.navigateByUrl(
                this.role() === 'admin' ? '/yonetim' : '/nobetlerim',
              ),
            400,
          ),
        );
      }, 900),
    );
  }
}
