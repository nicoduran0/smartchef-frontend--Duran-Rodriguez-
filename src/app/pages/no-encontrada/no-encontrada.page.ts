import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonContent } from '@ionic/angular';
import { EstadoVacioComponent } from '../../shared';

@Component({
  selector: 'app-no-encontrada',
  templateUrl: './no-encontrada.page.html',
  styleUrls: ['./no-encontrada.page.scss'],
  imports: [RouterLink, IonContent, IonButton, EstadoVacioComponent],
})
export class NoEncontradaPage {}
