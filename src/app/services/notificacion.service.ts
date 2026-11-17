import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { paginar, simular, simularError } from '../core/simulador';
import { NOTIFICACIONES_MOCK } from '../mock';
import { Notificacion, Pagina } from '../models';

@Injectable({ providedIn: 'root' })
export class NotificacionService {

  private notificaciones: Notificacion[] = structuredClone(NOTIFICACIONES_MOCK);

  /** Mis notificaciones, más recientes primero (GET /notificaciones?leida=). */
  listar(leida?: boolean, pagina = 0, tamano = 10): Observable<Pagina<Notificacion>> {
    const filtradas = this.notificaciones
      .filter(n => leida === undefined || n.leida === leida)
      .sort((a, b) => b.creadaEn.localeCompare(a.creadaEn));
    return simular(paginar(filtradas, pagina, tamano));
  }

  /** Marca una notificación como leída (PATCH /notificaciones/{id}/leida). */
  marcarLeida(id: number): Observable<Notificacion> {
    const n = this.notificaciones.find(x => x.id === id);
    if (!n) {
      return simularError(`No existe la notificación con id ${id}`);
    }
    n.leida = true;
    return simular(n);
  }

  /** Número de no leídas, para el globo (badge) de la campana. */
  contarNoLeidas(): Observable<number> {
    return simular(this.notificaciones.filter(n => !n.leida).length);
  }
}
