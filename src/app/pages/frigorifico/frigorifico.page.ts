import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon,
  IonInput, IonItem, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar,
} from '@ionic/angular';
import { DESPENSA_MOCK, fechaRelativa, INGREDIENTES_MOCK } from '../../mock';
import { ItemDespensa } from '../../models';
import { EstadoVacioComponent } from '../../shared';

const UNIDADES: Record<string, string> = { GRAMOS: 'g', MILILITROS: 'ml', UNIDADES: 'ud.' };

@Component({
  selector: 'app-frigorifico',
  templateUrl: './frigorifico.page.html',
  styleUrls: ['./frigorifico.page.scss'],
  imports: [
    FormsModule, IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon,
    IonContent, IonModal, IonTitle, IonItem, IonSelect, IonSelectOption, IonInput, EstadoVacioComponent,
  ],
})
export class FrigorificoPage {
  despensa = signal<ItemDespensa[]>(DESPENSA_MOCK.map(i => ({ ...i })));
  categoriaActiva = signal<string>('Todas');

  modalAbierto = signal(false);
  nuevoIngredienteId = signal<number>(INGREDIENTES_MOCK[0].id);
  nuevaCantidad = signal<number>(1);
  catalogo = INGREDIENTES_MOCK;

  categorias = ['Todas', 'Proteínas', 'Lácteos', 'Frutas', 'Verduras', 'Cereales', 'Otros'];

  proximosACaducar = computed(() => {
    const limite = fechaRelativa(3);
    return this.despensa().filter(i => i.caducidad !== null && i.caducidad <= limite).length;
  });

  itemsFiltrados = computed(() => {
    const cat = this.categoriaActiva();
    const limite = fechaRelativa(3);
    return this.despensa()
      .map(item => {
        const info = INGREDIENTES_MOCK.find(i => i.id === item.ingredienteId);
        return {
          ...item,
          categoria: info?.categoria ?? 'Otros',
          caducaPronto: item.caducidad !== null && item.caducidad <= limite,
        };
      })
      .filter(item => cat === 'Todas' || item.categoria === cat);
  });

  formatearCantidad(cantidad: number, unidad: string): string {
    return `${cantidad} ${UNIDADES[unidad] ?? ''}`;
  }

  eliminarItem(ingredienteId: number) {
    this.despensa.update(lista => lista.filter(i => i.ingredienteId !== ingredienteId));
  }

  guardarNuevo() {
    const ing = INGREDIENTES_MOCK.find(i => i.id === this.nuevoIngredienteId());
    if (!ing || this.nuevaCantidad() <= 0) return;

    this.despensa.update(lista => [
      { ingredienteId: ing.id, nombre: ing.nombre, unidad: ing.unidad, cantidad: this.nuevaCantidad(), caducidad: fechaRelativa(7) },
      ...lista,
    ]);
    this.modalAbierto.set(false);
    this.nuevaCantidad.set(1);
  }
}
