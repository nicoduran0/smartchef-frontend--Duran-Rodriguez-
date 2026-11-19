import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { DESPENSA_MOCK, INGREDIENTES_MOCK, RECETAS_MOCK } from '../../mock';
import { Ingrediente, RecetaPropuesta } from '../../models';
import { CabeceraAccionesComponent, EstadoVacioComponent } from '../../shared';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.page.html',
  styleUrls: ['./ingredientes.page.scss'],
  imports: [
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonModal,
    IonSearchbar,
    EstadoVacioComponent,
    CabeceraAccionesComponent,
  ],
})
export class IngredientesPage {
  seleccionadosIds = signal<number[]>([1, 2, 7]);
  modalAbierto = signal(false);
  filtroIngrediente = signal('');

  ingredientesSeleccionados = computed(() =>
    this.seleccionadosIds()
      .map(id => INGREDIENTES_MOCK.find(i => i.id === id))
      .filter((i): i is Ingrediente => i !== undefined)
  );

  ingredientesDisponibles = computed(() => {
    const actuales = new Set(this.seleccionadosIds());
    const q = this.filtroIngrediente().trim().toLowerCase();
    return INGREDIENTES_MOCK.filter(i => !actuales.has(i.id) && (!q || i.nombre.toLowerCase().includes(q)));
  });

  propuestas = computed<RecetaPropuesta[]>(() => {
    const tengo = new Set(this.seleccionadosIds());
    if (tengo.size === 0) return [];

    return RECETAS_MOCK
      .map(receta => {
        const coinciden = receta.ingredientes.filter(i => tengo.has(i.ingredienteId)).length;
        const ratio = coinciden / receta.ingredientes.length;
        return {
          receta,
          porcentajeCoincidencia: Math.round(ratio * 100),
          ingredientesFaltantes: receta.ingredientes.filter(i => !tengo.has(i.ingredienteId)).map(i => i.nombre),
        };
      })
      .filter(p => p.porcentajeCoincidencia > 0)
      .sort((a, b) => b.porcentajeCoincidencia - a.porcentajeCoincidencia);
  });

  quitarIngrediente(id: number) {
    this.seleccionadosIds.update(ids => ids.filter(item => item !== id));
  }

  agregarIngrediente(id: number) {
    if (!this.seleccionadosIds().includes(id)) {
      this.seleccionadosIds.update(ids => [...ids, id]);
    }
    this.modalAbierto.set(false);
    this.filtroIngrediente.set('');
  }

  cargarDesdeNevera() {
    this.seleccionadosIds.set(DESPENSA_MOCK.map(d => d.ingredienteId));
    this.modalAbierto.set(false);
  }

  textoFaltantes(faltantes: string[]): string {
    if (faltantes.length === 0) return '¡Tienes todos!';
    return `Falta: ${faltantes.length} ${faltantes.length === 1 ? 'ingrediente' : 'ingredientes'} (${faltantes.join(', ')})`;
  }
}
