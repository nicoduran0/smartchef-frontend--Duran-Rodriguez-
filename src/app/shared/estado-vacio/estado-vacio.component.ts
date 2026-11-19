import { Component, input } from '@angular/core';
import { IonIcon } from '@ionic/angular';

@Component({
  selector: 'app-estado-vacio',
  templateUrl: './estado-vacio.component.html',
  styleUrls: ['./estado-vacio.component.scss'],
  imports: [IonIcon],
})
export class EstadoVacioComponent {
  icono = input('search-outline');
  titulo = input.required<string>();
  mensaje = input('');
}
