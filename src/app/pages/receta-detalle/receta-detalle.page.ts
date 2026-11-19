import { Component, input } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  imports: [IonContent],
})
export class RecetaDetallePage {
  /** Llega desde la ruta 'receta/:id' gracias a withComponentInputBinding(). */
  id = input.required<string>();
}
