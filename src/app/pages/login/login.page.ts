import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput, IonSpinner } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack, eyeOffOutline, eyeOutline, logoApple, logoGoogle } from 'ionicons/icons';
import { AuthService, PASSWORD_DEMO } from '../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, IonContent, IonButton, IonInput, IonIcon, IonSpinner],
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly passwordDemo = PASSWORD_DEMO;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  verPassword = signal(false);
  cargando = signal(false);
  error = signal<string | null>(null);
  aviso = signal<string | null>(null);

  constructor() {
    addIcons({ arrowBack, eyeOutline, eyeOffOutline, logoGoogle, logoApple });
  }

  /** Muestra el error de un campo solo cuando el usuario ya lo ha tocado. */
  invalido(campo: 'email' | 'password'): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.error.set(null);

    this.auth.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigateByUrl('/home', { replaceUrl: true }),
      error: (e: Error) => {
        this.error.set(e.message);
        this.cargando.set(false);
      },
    });
  }

  proximamente(): void {
    this.aviso.set('El acceso con Google y Apple estará disponible próximamente.');
  }
}
