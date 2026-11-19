import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { RecetaResumen } from '../../models';

const ETIQUETA_DIFICULTAD = { FACIL: 'Fácil', MEDIA: 'Media', DIFICIL: 'Difícil' } as const;

@Component({
  selector: 'app-receta-tarjeta',
  templateUrl: './receta-tarjeta.component.html',
  styleUrls: ['./receta-tarjeta.component.scss'],
  imports: [RouterLink, IonIcon],
})
export class RecetaTarjetaComponent {
  /** La receta que se pinta (obligatoria). */
  receta = input.required<RecetaResumen>();

  /** 'grande' = tarjeta destacada con descripción; 'compacta' = la del carrusel y las listas. */
  variante = input<'compacta' | 'grande'>('compacta');

  dificultad = computed(() => ETIQUETA_DIFICULTAD[this.receta().dificultad]);
}
