import { MomentoComida } from './enums';

export interface RegistroComida {
  id: number;
  fecha: string; // 'YYYY-MM-DD'
  momento: MomentoComida;
  recetaId: number | null;       // puede ser comida libre
  recetaTitulo: string | null;
  descripcionLibre: string | null;
  calorias: number;
  proteinas?: number;            // solo mockup
  carbohidratos?: number;        // solo mockup
}

export interface ResumenDia {
  fecha: string;
  caloriasTotales: number;
  registros: RegistroComida[];
}

/** Lo que envía la pantalla al registrar una comida (POST /registros). */
export interface NuevoRegistro {
  fecha: string;
  momento: MomentoComida;
  recetaId?: number;           // si se omite, es comida libre
  descripcionLibre?: string;
  calorias?: number;           // solo para comida libre
  raciones?: number;           // por defecto 1
  descontarDespensa?: boolean;
}
