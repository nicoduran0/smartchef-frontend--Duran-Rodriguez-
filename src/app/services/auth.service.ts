import { Injectable, computed, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { USUARIO_MOCK } from '../mock';
import { LoginRequest, RegistroUsuarioRequest, Usuario } from '../models';
import { simular, simularError } from './simulador';

const CLAVE_SESION = 'smartchef_sesion';

/** Contraseña de la cuenta de demostración. */
export const PASSWORD_DEMO = 'Smartchef123';

interface Cuenta {
  usuario: Usuario;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  /** "Base de datos" de cuentas en memoria. */
  private cuentas: Cuenta[] = [{ usuario: USUARIO_MOCK, password: PASSWORD_DEMO }];

  private readonly _usuario = signal<Usuario | null>(this.cargarSesion());

  readonly usuario = this._usuario.asReadonly();
  readonly autenticado = computed(() => this._usuario() !== null);

  /** POST /auth/login */
  login(datos: LoginRequest): Observable<Usuario> {
    const email = datos.email.trim().toLowerCase();
    const cuenta = this.cuentas.find(c => c.usuario.email.toLowerCase() === email);

    if (!cuenta || cuenta.password !== datos.password) {
      return simularError('Email o contraseña incorrectos');
    }
    this.guardarSesion(cuenta.usuario);
    return simular(cuenta.usuario);
  }

  /** POST /auth/registro: crea la cuenta y abre sesión. */
  registro(datos: RegistroUsuarioRequest): Observable<Usuario> {
    const email = datos.email.trim().toLowerCase();
    if (this.cuentas.some(c => c.usuario.email.toLowerCase() === email)) {
      return simularError('Ya existe una cuenta con ese email'); // 409 en el backend
    }

    const nuevo: Usuario = {
      id: Date.now(),
      nombre: datos.nombre.trim(),
      email,
      rol: 'USUARIO',
      preferencias: { vegetariana: false, sinGluten: false, rapida: false, economica: false },
    };
    this.cuentas.push({ usuario: nuevo, password: datos.password });
    this.guardarSesion(nuevo);
    return simular(nuevo);
  }

  logout(): void {
    this._usuario.set(null);
    try {
      localStorage.removeItem(CLAVE_SESION);
    } catch { /* sin almacenamiento disponible */ }
  }

  private guardarSesion(usuario: Usuario): void {
    this._usuario.set(usuario);
    try {
      localStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
    } catch { /* sin almacenamiento disponible */ }
  }

  private cargarSesion(): Usuario | null {
    try {
      const guardado = localStorage.getItem(CLAVE_SESION);
      return guardado ? (JSON.parse(guardado) as Usuario) : null;
    } catch {
      return null;
    }
  }
}
