import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonCheckbox, IonContent, IonIcon, IonInput, IonSpinner, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowBack, eyeOffOutline, eyeOutline, logoApple, logoGoogle } from 'ionicons/icons';
import { AuthService, coincidenPasswords } from '../../core';

type Campo = 'nombre' | 'email' | 'password' | 'confirmar' | 'terminos';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [ReactiveFormsModule, RouterLink, IonContent, IonButton, IonInput, IonIcon, IonSpinner, IonCheckbox],
})
export class RegistroPage {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private nav = inject(NavController);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmar: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]],
    },
    { validators: coincidenPasswords },
  );

  verPassword = signal(false);
  cargando = signal(false);
  error = signal<string | null>(null);
  aviso = signal<string | null>(null);

  constructor() {
    addIcons({ arrowBack, eyeOutline, eyeOffOutline, logoGoogle, logoApple });
  }

  invalido(campo: Campo): boolean {
    const c = this.form.controls[campo];
    return c.invalid && (c.touched || c.dirty);
  }

  /** El error "no coinciden" es del grupo, no de un campo concreto. */
  noCoinciden(): boolean {
    const c = this.form.controls.confirmar;
    return this.form.hasError('noCoinciden') && (c.touched || c.dirty) && c.value !== '';
  }

  crearCuenta(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    this.error.set(null);

    const { nombre, email, password } = this.form.getRawValue();

    this.auth.registro({ nombre, email, password }).subscribe({
      next: () => this.nav.navigateRoot('/app/descubrir'),
      error: (e: Error) => {
        this.error.set(e.message);
        this.cargando.set(false);
      },
    });
  }

  proximamente(): void {
    this.aviso.set('El registro con Google y Apple estará disponible próximamente.');
  }
}
