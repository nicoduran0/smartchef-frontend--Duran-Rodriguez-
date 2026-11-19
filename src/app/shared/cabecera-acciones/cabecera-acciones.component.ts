import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { NOTIFICACIONES_MOCK, USUARIO_MOCK } from '../../mock';

@Component({
  selector: 'app-cabecera-acciones',
  imports: [RouterLink, IonIcon],
  template: `
    <div class="acciones-top">
      <a class="btn-icono nevera" routerLink="/frigorifico" aria-label="Mi frigorífico">
        <ion-icon name="snow-outline"></ion-icon>
      </a>

      <a class="btn-icono notif" routerLink="/notificaciones" aria-label="Notificaciones">
        <ion-icon name="notifications-outline"></ion-icon>
        @if (haySinLeer()) {
          <span class="punto"></span>
        }
      </a>

      <a class="btn-icono perfil" routerLink="/perfil" aria-label="Mi perfil">
        {{ inicial() }}
      </a>
    </div>
  `,
  styles: [`
    .acciones-top {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    .btn-icono {
      position: relative;
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: var(--sc-surface);
      border: 1px solid var(--sc-surface-2);
      display: grid;
      place-items: center;
      text-decoration: none;
      font-size: 20px;
      flex-shrink: 0;
    }

    .btn-icono.nevera {
      background: var(--sc-mint);
      border-color: var(--sc-mint);
      color: var(--sc-bg);
    }

    .btn-icono.notif {
      color: var(--sc-text);
    }

    .btn-icono.perfil {
      border-radius: 50%;
      border: 1.5px solid var(--sc-orange);
      color: var(--sc-orange);
      font-size: 16px;
      font-weight: 800;
    }

    .punto {
      position: absolute;
      top: 8px;
      right: 9px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--sc-orange);
    }
  `],
})
export class CabeceraAccionesComponent {
  inicial = computed(() => USUARIO_MOCK.nombre.charAt(0).toUpperCase());
  haySinLeer = computed(() => NOTIFICACIONES_MOCK.some(n => !n.leida));
}
