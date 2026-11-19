import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonCheckbox, IonContent, IonIcon, IonInput, IonSpinner } from '@ionic/angular';

function coincidenPasswords(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirmar = group.get('confirmar')?.value;
  return pass === confirmar ? null : { noCoinciden: true };
}

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  imports: [ReactiveFormsModule, RouterLink, IonContent, IonInput, IonCheckbox, IonButton, IonIcon, IonSpinner],
})
export class RegistroPage {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  verPassword = signal(false);
  cargando = signal(false);
  error = signal<string | null>(null);
  aviso = signal<string | null>(null);

  form = this.fb.nonNullable.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', [Validators.required]],
      terminos: [false, [Validators.requiredTrue]],
    },
    { validators: coincidenPasswords }
  );

  invalido(campo: 'nombre' | 'email' | 'password' | 'confirmar' | 'terminos'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  noCoinciden(): boolean {
    return this.form.hasError('noCoinciden') && this.form.controls.confirmar.touched;
  }

  proximamente() {
    this.aviso.set('Acceso con redes sociales disponible próximamente.');
  }

  crearCuenta() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigateByUrl('/app/descubrir', { replaceUrl: true });
  }
}
