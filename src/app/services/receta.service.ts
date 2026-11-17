import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paginar, simular, simularError } from '../core/simulador';
import { RECETAS_MOCK, RECETAS_RESUMEN_MOCK } from '../mock';
import { FiltroRecetas, Pagina, Receta, RecetaPropuesta, RecetaResumen } from '../models';

@Injectable({ providedIn: 'root' })
export class RecetaService {

  /** Catálogo paginado con filtros combinables (GET /recetas). */
  listar(filtro: FiltroRecetas = {}, pagina = 0, tamano = 10): Observable<Pagina<RecetaResumen>> {
    const texto = filtro.texto?.trim().toLowerCase();

    const filtradas = RECETAS_RESUMEN_MOCK.filter(r =>
      r.activa &&
      (!texto || r.titulo.toLowerCase().includes(texto)) &&
      (!filtro.vegetariana || r.vegetariana) &&
      (!filtro.sinGluten || r.sinGluten) &&
      (!filtro.rapida || r.rapida) &&
      (!filtro.economica || r.economica) &&
      (!filtro.dificultad || r.dificultad === filtro.dificultad) &&
      (filtro.tiempoMaximo === undefined || r.tiempoMinutos <= filtro.tiempoMaximo)
    );

    return simular(paginar(filtradas, pagina, tamano));
  }

  /** Detalle completo (GET /recetas/{id}). */
  obtener(id: number): Observable<Receta> {
    const receta = RECETAS_MOCK.find(r => r.id === id);
    return receta
      ? simular(receta)
      : simularError(`No existe la receta con id ${id}`);
  }

  /** La receta destacada de "Recomendado para ti". */
  recomendada(): Observable<RecetaResumen> {
    return simular(RECETAS_RESUMEN_MOCK[1]); // Ensalada griega, como en el mockup
  }

  /** Las más valoradas, para "Recetas populares". */
  populares(limite = 6): Observable<RecetaResumen[]> {
    const ids = [...RECETAS_MOCK]
      .sort((a, b) => (b.numValoraciones ?? 0) - (a.numValoraciones ?? 0))
      .slice(0, limite)
      .map(r => r.id);

    return simular(RECETAS_RESUMEN_MOCK.filter(r => ids.includes(r.id)));
  }

  /**
   * Búsqueda por ingredientes (RN-04): solo recetas con MÁS del 50 % de
   * coincidencia, ordenadas de mayor a menor, indicando lo que falta.
   */
  buscarPorIngredientes(ingredienteIds: number[]): Observable<RecetaPropuesta[]> {
    const tengo = new Set(ingredienteIds);

    const propuestas = RECETAS_MOCK
      .filter(r => r.activa)
      .map(r => {
        const coinciden = r.ingredientes.filter(i => tengo.has(i.ingredienteId)).length;
        return {
          receta: r,
          ratio: coinciden / r.ingredientes.length,
          ingredientesFaltantes: r.ingredientes
            .filter(i => !tengo.has(i.ingredienteId))
            .map(i => i.nombre),
        };
      })
      .filter(p => p.ratio > 0.5)
      .sort((a, b) => b.ratio - a.ratio)
      .map(p => ({
        receta: p.receta,
        porcentajeCoincidencia: Math.round(p.ratio * 100),
        ingredientesFaltantes: p.ingredientesFaltantes,
      }));

    return simular(propuestas);
  }
}
