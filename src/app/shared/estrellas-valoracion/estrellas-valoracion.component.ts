import { Component, computed, input } from '@angular/core';
import { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-estrellas-valoracion',
  imports: [IonIcon],
  template: `
    <div class="valoracion">
      <div class="estrellas">
        @for (icono of iconos(); track $index) {
          <ion-icon [name]="icono"></ion-icon>
        }
      </div>
      <strong>{{ media() }}</strong>
      @if (total()) {
        <span>({{ total() }} valoraciones)</span>
      }
    </div>
  `,
  styles: [`
    .valoracion { display: flex; align-items: center; gap: 8px; font-size: 13px; }
    .estrellas { display: flex; gap: 2px; color: var(--sc-orange); font-size: 15px; }
    strong { color: var(--sc-text); }
    span { color: var(--sc-text-muted); }
  `],
})
export class EstrellasValoracionComponent {
  media = input.required<number>();
  total = input<number>();

  iconos = computed(() =>
    [1, 2, 3, 4, 5].map(n => (this.media() >= n - 0.3 ? 'star' : 'star-outline'))
  );
}
