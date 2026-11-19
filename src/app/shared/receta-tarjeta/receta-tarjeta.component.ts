import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { RecetaResumen } from '../../models';

const DIFICULTAD_TEXTO: Record<string, string> = {
  FACIL: 'Fácil',
  MEDIA: 'Media',
  DIFICIL: 'Difícil',
};

@Component({
  selector: 'app-receta-tarjeta',
  imports: [RouterLink, IonIcon],
  template: `
    <a class="tarjeta" [class.destacada]="destacada()" [routerLink]="['/receta', receta().id]">
      <div class="foto">
        @if (receta().portadaUrl) {
          <img [src]="receta().portadaUrl" [alt]="receta().titulo" />
        } @else {
          <ion-icon name="restaurant-outline"></ion-icon>
        }
      </div>

      <div class="info">
        <h3>{{ receta().titulo }}</h3>
        <div class="meta">
          <ion-icon name="time-outline"></ion-icon>
          <span>{{ receta().tiempoMinutos }} min</span>
          <span>·</span>
          <strong class="dificultad">{{ dificultadTexto() }}</strong>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .tarjeta {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: var(--sc-surface);
      border: 1px solid var(--sc-surface-2);
      border-radius: 16px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
    }

    .foto {
      width: 100%;
      height: 125px;
      flex-shrink: 0;
      overflow: hidden;
      background: var(--sc-surface-2);
      display: grid;
      place-items: center;
    }

    .tarjeta.destacada .foto {
      height: 185px;
    }

    .foto img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }

    .info {
      padding: 12px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }

    h3 {
      margin: 0 0 8px;
      font-size: 14px;
      line-height: 1.3;
      color: var(--sc-text);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .tarjeta.destacada h3 {
      font-size: 17px;
    }

    .meta {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      color: var(--sc-text-muted);
      margin-top: auto;
    }

    .dificultad {
      color: var(--sc-mint);
      font-weight: 600;
    }
  `],
})
export class RecetaTarjetaComponent {
  receta = input.required<RecetaResumen>();
  destacada = input(false);

  dificultadTexto(): string {
    return DIFICULTAD_TEXTO[this.receta().dificultad] ?? this.receta().dificultad;
  }
}
