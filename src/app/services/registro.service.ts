import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { inicioSemana, sumarDias } from '../core/fechas';
import { simular, simularError } from '../core/simulador';
import { RECETAS_MOCK, REGISTROS_MOCK, fechaRelativa } from '../mock';
import { MomentoComida, NuevoRegistro, RegistroComida, ResumenDia } from '../models';
import { DespensaService } from './despensa.service';

const ORDEN_MOMENTO: Record<MomentoComida, number> = { DESAYUNO: 0, COMIDA: 1, CENA: 2 };

@Injectable({ providedIn: 'root' })
export class RegistroService {

  private despensa = inject(DespensaService);

  private registros: RegistroComida[] = structuredClone(REGISTROS_MOCK);
  private siguienteId = 100;

  /** La semana (lunes a domingo) de la fecha dada, con calorías por día (GET /registros/semana). */
  semana(fecha: string = fechaRelativa(0)): Observable<ResumenDia[]> {
    const lunes = inicioSemana(fecha);
    const dias: ResumenDia[] = [];

    for (let i = 0; i < 7; i++) {
      const dia = sumarDias(lunes, i);
      const delDia = this.registros
        .filter(r => r.fecha === dia)
        .sort((a, b) => ORDEN_MOMENTO[a.momento] - ORDEN_MOMENTO[b.momento]);

      dias.push({
        fecha: dia,
        caloriasTotales: delDia.reduce((suma, r) => suma + r.calorias, 0),
        registros: delDia,
      });
    }
    return simular(dias);
  }

  /** Registra lo cocinado (POST /registros). Aplica RN-07. */
  registrar(datos: NuevoRegistro): Observable<RegistroComida> {
    if (datos.fecha > fechaRelativa(0)) {
      return simularError('No se pueden registrar fechas futuras');
    }

    const duplicado = this.registros.some(r => r.fecha === datos.fecha && r.momento === datos.momento);
    if (duplicado) {
      return simularError(`Ya hay un registro de ${datos.momento} para el ${datos.fecha}`);
    }

    const raciones = datos.raciones ?? 1;
    const receta = datos.recetaId !== undefined
      ? RECETAS_MOCK.find(r => r.id === datos.recetaId)
      : undefined;

    if (datos.recetaId !== undefined && !receta) {
      return simularError(`No existe la receta con id ${datos.recetaId}`);
    }
    if (!receta && !datos.descripcionLibre?.trim()) {
      return simularError('Indica una receta o describe la comida libre');
    }

    const nuevo: RegistroComida = {
      id: this.siguienteId++,
      fecha: datos.fecha,
      momento: datos.momento,
      recetaId: receta?.id ?? null,
      recetaTitulo: receta?.titulo ?? null,
      descripcionLibre: receta ? null : datos.descripcionLibre!.trim(),
      calorias: receta ? Math.round(receta.caloriasPorRacion * raciones) : (datos.calorias ?? 0),
    };
    this.registros.push(nuevo);

    if (receta && datos.descontarDespensa) {
      const factor = raciones / receta.raciones;
      receta.ingredientes.forEach(ing =>
        this.despensa.restar(ing.ingredienteId, ing.cantidad * factor)
      );
    }

    return simular(nuevo);
  }

  /** Borra un registro. */
  eliminar(id: number): Observable<void> {
    if (!this.registros.some(r => r.id === id)) {
      return simularError(`No existe el registro con id ${id}`);
    }
    this.registros = this.registros.filter(r => r.id !== id);
    return simular(undefined);
  }
}
