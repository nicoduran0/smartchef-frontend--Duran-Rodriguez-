import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput, IonSpinner } from '@ionic/angular';
import { USUARIO_MOCK } from '../../mock';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ReactiveFormsModule, RouterLink, IonContent, IonInput, IonButton, IonIcon, IonSpinner],
})
export class LoginPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  passwordDemo = 'SmartChef2026';
  verPassword = signal(false);
  cargando = signal(false);
  error = signal<string | null>(null);
  aviso = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    email: [USUARIO_MOCK.email, [Validators.required, Validators.email]],
    password: [this.passwordDemo, [Validators.required, Validators.minLength(6)]],
  });

  invalido(campo: 'email' | 'password'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  proximamente() {
    this.aviso.set('Acceso con redes sociales disponible próximamente.');
  }

  entrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigateByUrl('/app/descubrir', { replaceUrl: true });
  }
}
