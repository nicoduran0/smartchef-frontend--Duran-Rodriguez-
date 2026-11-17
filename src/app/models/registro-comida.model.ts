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
