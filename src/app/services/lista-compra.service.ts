import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { simular, simularError } from '../core/simulador';
import { INGREDIENTES_MOCK, LISTA_COMPRA_MOCK, RECETAS_MOCK } from '../mock';
import { ListaCompra } from '../models';
import { DespensaService } from './despensa.service';

@Injectable({ providedIn: 'root' })
export class ListaCompraService {

  private despensa = inject(DespensaService);

  /** Solo puede haber una lista abierta por persona (RN-05). */
  private lista: ListaCompra | null = structuredClone(LISTA_COMPRA_MOCK);
  private siguienteIdLinea = 100;

  /** Mi lista abierta, o null si no hay ninguna. */
  obtenerAbierta(): Observable<ListaCompra | null> {
    return simular(this.lista);
  }

  /** Añade a la lista abierta lo que falta de una receta (POST /listas-compra/desde-receta). */
  anadirDesdeReceta(recetaId: number, raciones: number): Observable<ListaCompra> {
    const receta = RECETAS_MOCK.find(r => r.id === recetaId);
    if (!receta) {
      return simularError(`No existe la receta con id ${recetaId}`);
    }

    // Si no hay lista abierta, se crea una
    if (!this.lista) {
      this.lista = { id: Date.now(), estado: 'ABIERTA', lineas: [], costeEstimado: 0 };
    }
    this.lista.recetaOrigen = receta.titulo;

    const factor = raciones / receta.raciones;

    for (const ing of receta.ingredientes) {
      const necesaria = ing.cantidad * factor;
      const faltante = necesaria - this.despensa.cantidadVigente(ing.ingredienteId);
      if (faltante <= 0) {
        continue; // ya lo tengo todo
      }

      const cantidad = Math.round(faltante * 100) / 100;
      const existente = this.lista.lineas.find(l => l.ingredienteId === ing.ingredienteId);

      if (existente) {
        existente.cantidad = Math.round((existente.cantidad + cantidad) * 100) / 100;
      } else {
        const catalogo = INGREDIENTES_MOCK.find(i => i.id === ing.ingredienteId);
        this.lista.lineas.push({
          id: this.siguienteIdLinea++,
          ingredienteId: ing.ingredienteId,
          nombre: ing.nombre,
          cantidad,
          unidad: ing.unidad,
          comprado: false,
          categoria: catalogo?.categoria,
        });
      }
    }

    this.lista.costeEstimado = this.calcularCoste(this.lista);
    return simular(this.lista);
  }

  /** Marca o desmarca una línea como comprada. */
  alternarComprado(lineaId: number): Observable<ListaCompra> {
    if (!this.lista) {
      return simularError('No hay ninguna lista abierta');
    }
    const linea = this.lista.lineas.find(l => l.id === lineaId);
    if (linea) {
      linea.comprado = !linea.comprado;
    }
    return simular(this.lista);
  }

  /** Cierra la lista y pasa lo comprado a la despensa (PATCH /listas-compra/{id}/cerrar). */
  cerrar(): Observable<ListaCompra> {
    if (!this.lista) {
      return simularError('No hay ninguna lista abierta');
    }

    this.lista.lineas
      .filter(l => l.comprado)
      .forEach(l => this.despensa.sumar(l.ingredienteId, l.cantidad));

    const cerrada: ListaCompra = { ...this.lista, estado: 'CERRADA' };
    this.lista = null;
    return simular(cerrada);
  }

  /** Coste estimado = suma de cantidad × precio por unidad del catálogo. */
  private calcularCoste(lista: ListaCompra): number {
    const total = lista.lineas.reduce((suma, l) => {
      const precio = INGREDIENTES_MOCK.find(i => i.id === l.ingredienteId)?.precioPorUnidad ?? 0;
      return suma + l.cantidad * precio;
    }, 0);
    return Math.round(total * 100) / 100;
  }
}
