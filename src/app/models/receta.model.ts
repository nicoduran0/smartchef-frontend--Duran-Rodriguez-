import { Dificultad, UnidadIngrediente } from './enums';

export interface Paso {
  numero: number;
  descripcion: string;
}

export interface RecetaIngrediente {
  ingredienteId: number;
  nombre: string;
  cantidad: number;
  unidad: UnidadIngrediente;
}

/** Lo que se muestra en tarjetas y listados (catálogo, populares, favoritos). */
export interface RecetaResumen {
  id: number;
  titulo: string;
  descripcion: string;
  tiempoMinutos: number;
  dificultad: Dificultad;
  caloriasPorRacion: number;
  costePorRacion: number;
  portadaUrl: string | null;
  vegetariana: boolean;
  sinGluten: boolean;
  rapida: boolean;
  economica: boolean;
  activa: boolean;
}

/** Detalle completo de una receta (endpoint GET /recetas/{id}). */
export interface Receta extends RecetaResumen {
  raciones: number;
  autorNombre: string;
  ingredientes: RecetaIngrediente[];
  pasos: Paso[];
  fotosUrls: string[];
  valoracionMedia?: number;   // solo mockup (4.8)
  numValoraciones?: number;   // solo mockup (142)
}

/** Filtros del catálogo (RF-02). Todos opcionales y combinables. */
export interface FiltroRecetas {
  texto?: string;
  vegetariana?: boolean;
  sinGluten?: boolean;
  rapida?: boolean;
  economica?: boolean;
  dificultad?: Dificultad;
  tiempoMaximo?: number;
}

/** Propuesta de la búsqueda por ingredientes (RN-04). */
export interface RecetaPropuesta {
  receta: RecetaResumen;
  porcentajeCoincidencia: number;
  ingredientesFaltantes: string[];
}
