import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  imports: [IonContent, IonButton],
})
export class BienvenidaPage {

  private router = inject(Router);

  ir(ruta: string): void {
    this.router.navigateByUrl(ruta);
  }
}
