import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { simular } from '../core/simulador';
import { DESPENSA_MOCK, INGREDIENTES_MOCK, fechaRelativa } from '../mock';
import { ItemDespensa } from '../models';

@Injectable({ providedIn: 'root' })
export class DespensaService {

  /** Estado en memoria: empieza como copia del mock. */
  private items: ItemDespensa[] = structuredClone(DESPENSA_MOCK);

  /** Mi despensa, con los próximos a caducar primero (GET /despensa). */
  listar(): Observable<ItemDespensa[]> {
    const ordenados = [...this.items].sort((a, b) =>
      (a.caducidad ?? '9999-12-31').localeCompare(b.caducidad ?? '9999-12-31')
    );
    return simular(ordenados);
  }

  /** Añade o actualiza un ingrediente. Cantidad 0 lo elimina (PUT /despensa/{id}). */
  guardar(ingredienteId: number, cantidad: number, caducidad: string | null): Observable<ItemDespensa | null> {
    if (cantidad <= 0) {
      this.items = this.items.filter(i => i.ingredienteId !== ingredienteId);
      return simular(null);
    }

    const existente = this.items.find(i => i.ingredienteId === ingredienteId);
    if (existente) {
      existente.cantidad = cantidad;
      existente.caducidad = caducidad;
      return simular(existente);
    }

    const ingrediente = INGREDIENTES_MOCK.find(i => i.id === ingredienteId);
    const nuevo: ItemDespensa = {
      ingredienteId,
      nombre: ingrediente?.nombre ?? 'Ingrediente',
      unidad: ingrediente?.unidad ?? 'UNIDADES',
      cantidad,
      caducidad,
    };
    this.items.push(nuevo);
    return simular(nuevo);
  }

  /** Suma cantidad a la despensa (se usa al cerrar una lista de la compra). */
  sumar(ingredienteId: number, cantidad: number): void {
    const existente = this.items.find(i => i.ingredienteId === ingredienteId);
    if (existente) {
      existente.cantidad += cantidad;
      return;
    }
    const ingrediente = INGREDIENTES_MOCK.find(i => i.id === ingredienteId);
    this.items.push({
      ingredienteId,
      nombre: ingrediente?.nombre ?? 'Ingrediente',
      unidad: ingrediente?.unidad ?? 'UNIDADES',
      cantidad,
      caducidad: fechaRelativa(7), // caducidad por defecto en el mock
    });
  }

  /** Cantidad disponible de un ingrediente (0 si no hay o está caducado). */
  cantidadVigente(ingredienteId: number): number {
    const hoy = fechaRelativa(0);
    const item = this.items.find(i => i.ingredienteId === ingredienteId);
    if (!item || (item.caducidad !== null && item.caducidad < hoy)) {
      return 0;
    }
    return item.cantidad;
  }

  /** Ids de ingredientes NO caducados, para la búsqueda por ingredientes (RN-04). */
  idsVigentes(): Observable<number[]> {
    const hoy = fechaRelativa(0);
    const ids = this.items
      .filter(i => i.caducidad === null || i.caducidad >= hoy)
      .map(i => i.ingredienteId);
    return simular(ids);
  }
}
