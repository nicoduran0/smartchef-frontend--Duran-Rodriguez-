import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonFooter, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from '@ionic/angular';
import { fechaRelativa, RECETAS_RESUMEN_MOCK, REGISTROS_MOCK } from '../../mock';
import { MomentoComida, RecetaResumen, RegistroComida } from '../../models';
import { AnilloProgresoComponent, CabeceraAccionesComponent } from '../../shared';

const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

@Component({
  selector: 'app-semana',
  templateUrl: './semana.page.html',
  styleUrls: ['./semana.page.scss'],
  imports: [
    RouterLink,
    IonContent,
    IonFooter,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    AnilloProgresoComponent,
    CabeceraAccionesComponent,
  ],
})
export class SemanaPage {
  dias = this.generarSemana();
  fechaSeleccionada = signal<string>(fechaRelativa(0));
  registros = signal<RegistroComida[]>(REGISTROS_MOCK.map(r => ({ ...r })));
  completados = signal<number[]>([1, 2]);

  momentoAgregando = signal<MomentoComida | null>(null);
  recetasDisponibles = RECETAS_RESUMEN_MOCK;

  registrosDelDia = computed(() => this.registros().filter(r => r.fecha === this.fechaSeleccionada()));
  desayuno = computed(() => this.registrosDelDia().find(r => r.momento === 'DESAYUNO'));
  almuerzo = computed(() => this.registrosDelDia().find(r => r.momento === 'COMIDA'));
  cena = computed(() => this.registrosDelDia().find(r => r.momento === 'CENA'));

  totales = computed(() => {
    const lista = this.registrosDelDia();
    const kcal = lista.reduce((acc, r) => acc + r.calorias, 0);
    const prot = lista.reduce((acc, r) => acc + (r.proteinas ?? 0), 0);
    const carb = lista.reduce((acc, r) => acc + (r.carbohidratos ?? 0), 0);
    return {
      kcal, kcalPct: (kcal / 1230) * 100,
      prot, protPct: (prot / 69) * 100,
      carb, carbPct: (carb / 220) * 100,
    };
  });

  private generarSemana() {
    const hoy = new Date();
    const diffLunes = hoy.getDay() === 0 ? -6 : 1 - hoy.getDay();
    return Array.from({ length: 7 }, (_, i) => {
      const offset = diffLunes + i;
      const d = new Date();
      d.setDate(hoy.getDate() + offset);
      return { fecha: fechaRelativa(offset), diaCorto: DIAS_CORTOS[d.getDay()], numero: d.getDate() };
    });
  }

  fotoDeReceta(recetaId: number | null): string | null {
    return RECETAS_RESUMEN_MOCK.find(r => r.id === recetaId)?.portadaUrl ?? null;
  }

  esCompletado(id: number): boolean {
    return this.completados().includes(id);
  }

  toggleCompletado(event: Event, id: number) {
    event.preventDefault();
    event.stopPropagation();
    this.completados.update(lista => (lista.includes(id) ? lista.filter(x => x !== id) : [...lista, id]));
  }

  asignarReceta(receta: RecetaResumen) {
    const momento = this.momentoAgregando();
    if (!momento) return;
    const nuevoId = Date.now();
    this.registros.update(lista => [
      ...lista,
      {
        id: nuevoId,
        fecha: this.fechaSeleccionada(),
        momento,
        recetaId: receta.id,
        recetaTitulo: receta.titulo,
        descripcionLibre: null,
        calorias: receta.caloriasPorRacion,
        proteinas: 25,
        carbohidratos: 45,
      },
    ]);
    this.completados.update(lista => [...lista, nuevoId]);
    this.momentoAgregando.set(null);
  }
}
