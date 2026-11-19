import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonSearchbar, IonSpinner } from '@ionic/angular';
import { RECETAS_RESUMEN_MOCK, USUARIO_MOCK } from '../../mock';
import { RecetaResumen } from '../../models';
import { CabeceraAccionesComponent, EstadoVacioComponent, RecetaTarjetaComponent } from '../../shared';

type ClaveFiltro = 'vegetariana' | 'sinGluten' | 'rapida' | 'economica';

@Component({
  selector: 'app-descubrir',
  templateUrl: './descubrir.page.html',
  styleUrls: ['./descubrir.page.scss'],
  imports: [
    RouterLink,
    IonContent,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonSpinner,
    RecetaTarjetaComponent,
    EstadoVacioComponent,
    CabeceraAccionesComponent,
  ],
})
export class DescubrirPage {
  nombre = computed(() => USUARIO_MOCK.nombre.split(' ')[0]);

  texto = signal('');
  buscando = signal(false);
  cargando = signal(false);
  mostrarTodas = signal(false);

  chips: { clave: ClaveFiltro; etiqueta: string }[] = [
    { clave: 'rapida', etiqueta: 'Rápida (< 30 min)' },
    { clave: 'vegetariana', etiqueta: 'Vegetariana' },
    { clave: 'economica', etiqueta: 'Económica' },
    { clave: 'sinGluten', etiqueta: 'Sin gluten' },
  ];

  filtros = signal<Record<ClaveFiltro, boolean>>({
    vegetariana: false,
    sinGluten: false,
    rapida: false,
    economica: false,
  });

  hayBusqueda = computed(() => {
    const f = this.filtros();
    return this.texto().trim().length > 0 || f.vegetariana || f.sinGluten || f.rapida || f.economica;
  });

  resultados = computed<RecetaResumen[]>(() => {
    const q = this.texto().trim().toLowerCase();
    const f = this.filtros();

    return RECETAS_RESUMEN_MOCK.filter(r => {
      if (q && !r.titulo.toLowerCase().includes(q) && !r.descripcion.toLowerCase().includes(q)) return false;
      if (f.vegetariana && !r.vegetariana) return false;
      if (f.sinGluten && !r.sinGluten) return false;
      if (f.rapida && r.tiempoMinutos > 30) return false;
      if (f.economica && r.costePorRacion > 5) return false;
      return true;
    });
  });

  recomendada = computed<RecetaResumen | null>(() => this.resultados()[0] ?? null);

  populares = computed<RecetaResumen[]>(() => {
    const lista = this.resultados();
    return this.mostrarTodas() ? lista : lista.slice(1);
  });

  alEscribir(valor: string | null | undefined) {
    this.texto.set(valor ?? '');
  }

  alternar(clave: ClaveFiltro) {
    this.filtros.update(actual => ({ ...actual, [clave]: !actual[clave] }));
  }

  verTodo() {
    this.mostrarTodas.set(true);
    this.limpiar();
  }

  limpiar() {
    this.texto.set('');
    this.filtros.set({ vegetariana: false, sinGluten: false, rapida: false, economica: false });
  }
}
