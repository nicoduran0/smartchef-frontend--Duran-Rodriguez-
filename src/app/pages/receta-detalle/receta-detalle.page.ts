import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonFooter,
  IonHeader, IonIcon, IonLabel, IonSegment, IonSegmentButton, IonToolbar, ToastController,
} from '@ionic/angular';
import { RECETAS_MOCK } from '../../mock';
import { EstadoVacioComponent, EstrellasValoracionComponent } from '../../shared';

const UNIDADES: Record<string, string> = { GRAMOS: 'g', MILILITROS: 'ml', UNIDADES: ' ud.' };

@Component({
  selector: 'app-receta-detalle',
  templateUrl: './receta-detalle.page.html',
  styleUrls: ['./receta-detalle.page.scss'],
  imports: [
    FormsModule, RouterLink, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton,
    IonIcon, IonContent, IonSegment, IonSegmentButton, IonLabel, IonCheckbox, IonFooter,
    EstadoVacioComponent, EstrellasValoracionComponent,
  ],
})
export class RecetaDetallePage {
  private readonly toastCtrl = inject(ToastController);

  id = input.required<string>();
  receta = computed(() => RECETAS_MOCK.find(r => r.id === Number(this.id())));

  seccion = signal<'ingredientes' | 'preparacion'>('ingredientes');
  esFavorita = signal(false);
  marcados = signal<number[]>([1, 2, 3]);

  formatearCantidad(cantidad: number, unidad: string): string {
    return `${cantidad}${UNIDADES[unidad] ?? ''}`;
  }

  estaMarcado(ingredienteId: number): boolean {
    return this.marcados().includes(ingredienteId);
  }

  toggleIngrediente(ingredienteId: number, checked: boolean) {
    this.marcados.update(lista =>
      checked ? [...lista, ingredienteId] : lista.filter(id => id !== ingredienteId)
    );
  }

  async agregarALista() {
    const toast = await this.toastCtrl.create({
      message: 'Ingredientes añadidos a tu lista de compras',
      duration: 2000,
      color: 'secondary',
      position: 'top',
    });
    await toast.present();
  }
}
