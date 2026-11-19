import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonToggle, IonToolbar } from '@ionic/angular';
import { RECETAS_RESUMEN_MOCK, USUARIO_MOCK } from '../../mock';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [RouterLink, IonHeader, IonToolbar, IonButtons, IonBackButton, IonContent, IonIcon, IonButton, IonToggle],
})
export class PerfilPage {
  private readonly router = inject(Router);

  usuario = USUARIO_MOCK;
  pestana = signal<'datos' | 'recetas' | 'ajustes'>('datos');
  verPassword = signal(false);
  recetasRealizadas = RECETAS_RESUMEN_MOCK.slice(0, 3);
  preferencias = signal({ ...USUARIO_MOCK.preferencias });

  inicial(): string {
    return this.usuario.nombre.charAt(0).toUpperCase();
  }

  cambiarPreferencia(clave: 'vegetariana' | 'sinGluten' | 'rapida' | 'economica', valor: boolean) {
    this.preferencias.update(p => ({ ...p, [clave]: valor }));
  }

  cerrarSesion() {
    this.router.navigateByUrl('/bienvenida', { replaceUrl: true });
  }
  modoOscuro = signal(!document.body.classList.contains('tema-claro'));

  cambiarTema(oscuro: boolean) {
    this.modoOscuro.set(oscuro);
    document.body.classList.toggle('tema-claro', !oscuro);
  }
}
