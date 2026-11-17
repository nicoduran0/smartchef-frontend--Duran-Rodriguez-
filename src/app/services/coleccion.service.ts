import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { simular, simularError } from '../core/simulador';
import { COLECCIONES_MOCK, RECETAS_RESUMEN_MOCK } from '../mock';
import { Coleccion } from '../models';

@Injectable({ providedIn: 'root' })
export class ColeccionService {

  private colecciones: Coleccion[] = structuredClone(COLECCIONES_MOCK);

  /** Mis colecciones con sus recetas (GET /colecciones). */
  listar(): Observable<Coleccion[]> {
    return simular(this.colecciones);
  }

  /** Guarda una receta en una colección, y la crea si no existe (PUT /colecciones/{nombre}/recetas/{id}). */
  guardarReceta(nombre: string, recetaId: number): Observable<Coleccion> {
    const receta = RECETAS_RESUMEN_MOCK.find(r => r.id === recetaId);
    if (!receta) {
      return simularError(`No existe la receta con id ${recetaId}`);
    }

    let coleccion = this.colecciones.find(c => c.nombre.toLowerCase() === nombre.trim().toLowerCase());
    if (!coleccion) {
      coleccion = { id: Date.now(), nombre: nombre.trim(), esFavoritas: false, recetas: [] };
      this.colecciones.push(coleccion);
    }

    if (coleccion.recetas.some(r => r.id === recetaId)) {
      return simularError(`La receta ya está en la colección "${coleccion.nombre}"`);
    }

    coleccion.recetas.push(structuredClone(receta));
    return simular(coleccion);
  }

  /** Quita una receta de una colección. */
  quitarReceta(coleccionId: number, recetaId: number): Observable<Coleccion> {
    const coleccion = this.colecciones.find(c => c.id === coleccionId);
    if (!coleccion) {
      return simularError(`No existe la colección con id ${coleccionId}`);
    }
    coleccion.recetas = coleccion.recetas.filter(r => r.id !== recetaId);
    return simular(coleccion);
  }

  /** Borra una colección. "Favoritas" no se puede borrar (RN-08). */
  eliminar(coleccionId: number): Observable<void> {
    const coleccion = this.colecciones.find(c => c.id === coleccionId);
    if (!coleccion) {
      return simularError(`No existe la colección con id ${coleccionId}`);
    }
    if (coleccion.esFavoritas) {
      return simularError('La colección "Favoritas" no se puede borrar');
    }
    this.colecciones = this.colecciones.filter(c => c.id !== coleccionId);
    return simular(undefined);
  }
}
