import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonSearchbar, IonSpinner } from '@ionic/angular';
import { AuthService } from '../../core';
import { RecetaResumen } from '../../models';
import { RecetaService } from '../../services';
import { EstadoVacioComponent, RecetaTarjetaComponent } from '../../shared';

type ClaveFiltro = 'vegetariana' | 'sinGluten' | 'rapida' | 'economica';

@Component({
  selector: 'app-descubrir',
  templateUrl: './descubrir.page.html',
  styleUrls: ['./descubrir.page.scss'],
  imports: [
    RouterLink, IonContent, IonIcon, IonSearchbar, IonButton, IonSpinner,
    RecetaTarjetaComponent, EstadoVacioComponent,
  ],
})
export class DescubrirPage {

  private auth = inject(AuthService);
  private recetas = inject(RecetaService);

  readonly chips: { clave: ClaveFiltro; etiqueta: string }[] = [
    { clave: 'vegetariana', etiqueta: 'Vegetariano' },
    { clave: 'sinGluten', etiqueta: 'Sin gluten' },
    { clave: 'rapida', etiqueta: 'Rápido' },
    { clave: 'economica', etiqueta: 'Económico' },
  ];

  nombre = computed(() => this.auth.usuario()?.nombre.split(' ')[0] ?? '');
  inicial = computed(() => this.nombre().charAt(0).toUpperCase());

  texto = signal('');
  filtros = signal<Record<ClaveFiltro, boolean>>({
    vegetariana: false, sinGluten: false, rapida: false, economica: false,
  });
  verTodas = signal(false);

  recomendada = signal<RecetaResumen | null>(null);
  populares = signal<RecetaResumen[]>([]);
  resultados = signal<RecetaResumen[]>([]);
  cargando = signal(true);

  /** true cuando hay texto, algún filtro activo o se pulsó "Ver todo". */
  buscando = computed(
    () => this.texto().trim() !== '' || this.verTodas() || Object.values(this.filtros()).some(Boolean),
  );

  constructor() {
    this.recetas.recomendada().subscribe(r => this.recomendada.set(r));
    this.recetas.populares().subscribe(lista => {
      this.populares.set(lista);
      this.cargando.set(false);
    });
  }

  alEscribir(valor: string | null | undefined): void {
    this.texto.set(valor ?? '');
    this.buscar();
  }

  alternar(clave: ClaveFiltro): void {
    this.filtros.update(f => ({ ...f, [clave]: !f[clave] }));
    this.buscar();
  }

  verTodo(): void {
    this.verTodas.set(true);
    this.buscar();
  }

  limpiar(): void {
    this.texto.set('');
    this.verTodas.set(false);
    this.filtros.set({ vegetariana: false, sinGluten: false, rapida: false, economica: false });
    this.resultados.set([]);
  }

  private buscar(): void {
    if (!this.buscando()) {
      this.resultados.set([]);
      return;
    }
    this.recetas
      .listar({ texto: this.texto(), ...this.filtros() }, 0, 50)
      .subscribe(pagina => this.resultados.set(pagina.content));
  }
}
