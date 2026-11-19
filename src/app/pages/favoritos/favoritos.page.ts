import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon } from '@ionic/angular';
import { COLECCIONES_MOCK } from '../../mock';
import { CabeceraAccionesComponent, EstadoVacioComponent } from '../../shared';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  imports: [RouterLink, IonContent, IonButton, IonIcon, EstadoVacioComponent, CabeceraAccionesComponent],
})
export class FavoritosPage {
  colecciones = COLECCIONES_MOCK;
  activaId = signal<number>(1);

  recetasMostradas = computed(() => {
    const col = this.colecciones.find(c => c.id === this.activaId());
    return col ? col.recetas : [];
  });

  nombreEtiqueta(recetaId: number): string {
    const activa = this.colecciones.find(c => c.id === this.activaId());
    if (activa && !activa.esFavoritas) return activa.nombre;
    const sub = this.colecciones.find(c => !c.esFavoritas && c.recetas.some(r => r.id === recetaId));
    return sub?.nombre ?? 'Favoritas';
  }
}
