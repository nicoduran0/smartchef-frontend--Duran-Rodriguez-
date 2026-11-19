import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  IonBackButton, IonButton, IonButtons, IonCheckbox, IonContent, IonFooter,
  IonHeader, IonIcon, IonToolbar, ToastController,
} from '@ionic/angular';
import { LISTA_COMPRA_MOCK } from '../../mock';
import { LineaListaCompra } from '../../models';

const UNIDADES: Record<string, string> = { GRAMOS: 'g', MILILITROS: 'ml' };

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.page.html',
  styleUrls: ['./lista-compra.page.scss'],
  imports: [DecimalPipe, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonCheckbox, IonFooter, IonButton, IonIcon],
})
export class ListaCompraPage {
  private readonly toastCtrl = inject(ToastController);

  recetaOrigen = LISTA_COMPRA_MOCK.recetaOrigen ?? 'Tu planificación';
  costeEstimado = LISTA_COMPRA_MOCK.costeEstimado;
  lineas = signal<LineaListaCompra[]>(LISTA_COMPRA_MOCK.lineas.map(l => ({ ...l })));

  grupos = computed(() => {
    const categorias = [...new Set(this.lineas().map(l => l.categoria || 'Otros'))];
    return categorias.map(categoria => ({
      categoria,
      items: this.lineas().filter(l => (l.categoria || 'Otros') === categoria),
    }));
  });

  pendientes = computed(() => this.lineas().filter(l => !l.comprado).length);

  toggleComprado(id: number, comprado: boolean) {
    this.lineas.update(lista => lista.map(item => (item.id === id ? { ...item, comprado } : item)));
  }

  formatearCantidad(cantidad: number, unidad: string): string {
    if (unidad === 'UNIDADES') return cantidad === 1 ? '1 unidad' : `${cantidad} unidades`;
    return `${cantidad}${UNIDADES[unidad] ?? ''}`;
  }

  async compartirLista() {
    const toast = await this.toastCtrl.create({
      message: 'Lista copiada para compartir',
      duration: 2000,
      color: 'secondary',
      position: 'top',
    });
    await toast.present();
  }
}
