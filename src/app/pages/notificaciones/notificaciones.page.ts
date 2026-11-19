import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonToolbar } from '@ionic/angular';
import { NOTIFICACIONES_MOCK } from '../../mock';
import { Notificacion } from '../../models';
import { EstadoVacioComponent } from '../../shared';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  imports: [RouterLink, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon, IonContent, EstadoVacioComponent],
})
export class NotificacionesPage {
  notificaciones = signal<Notificacion[]>(NOTIFICACIONES_MOCK.map(n => ({ ...n })));

  marcarTodasLeidas() {
    this.notificaciones.update(lista => lista.map(n => ({ ...n, leida: true })));
  }

  rutaDestino(n: Notificacion): string {
    if (n.recurso === 'RECETA' && n.recursoId) return `/receta/${n.recursoId}`;
    if (n.recurso === 'DESPENSA') return '/app/ingredientes/frigorifico';
    if (n.recurso === 'LISTA') return '/lista-compra';
    return '/app/semana';
  }
}
