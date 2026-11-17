import { Rol } from './enums';

export interface PreferenciasUsuario {
  vegetariana: boolean;
  sinGluten: boolean;
  rapida: boolean;
  economica: boolean;
}

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: Rol;
  preferencias: PreferenciasUsuario;
  telefono?: string;   // solo mockup
  avatarUrl?: string;  // solo mockup
}
