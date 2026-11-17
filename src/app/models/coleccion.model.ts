import { RecetaResumen } from './receta.model';

export interface Coleccion {
  id: number;
  nombre: string;
  esFavoritas: boolean; // "Favoritas" no se puede borrar (RN-08)
  recetas: RecetaResumen[];
}
