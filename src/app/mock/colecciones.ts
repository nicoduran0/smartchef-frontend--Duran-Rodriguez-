import { Coleccion, RecetaResumen } from '../models';
import { RECETAS_RESUMEN_MOCK } from './recetas';

/** Devuelve las recetas cuyos ids se indican, en ese orden. */
function recetasPorIds(ids: number[]): RecetaResumen[] {
  return ids
    .map(id => RECETAS_RESUMEN_MOCK.find(r => r.id === id))
    .filter((r): r is RecetaResumen => r !== undefined);
}

export const COLECCIONES_MOCK: Coleccion[] = [
  { id: 1, nombre: 'Favoritas',     esFavoritas: true,  recetas: recetasPorIds([1, 2, 3, 5]) },
  { id: 2, nombre: 'Cenas rápidas', esFavoritas: false, recetas: recetasPorIds([1, 4]) },
  { id: 3, nombre: 'Postres',       esFavoritas: false, recetas: recetasPorIds([6]) },
  { id: 4, nombre: 'Meal prep',     esFavoritas: false, recetas: recetasPorIds([5, 7]) },
];
