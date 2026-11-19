import { AbstractControl, ValidationErrors } from '@angular/forms';

/** Valida a nivel de formulario que 'password' y 'confirmar' sean iguales. */
export function coincidenPasswords(grupo: AbstractControl): ValidationErrors | null {
  const password = grupo.get('password')?.value;
  const confirmar = grupo.get('confirmar')?.value;
  return password === confirmar ? null : { noCoinciden: true };
}
