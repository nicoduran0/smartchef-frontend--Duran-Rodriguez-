import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { calendarOutline, heartOutline, homeOutline, restaurantOutline, searchOutline, snowOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({ homeOutline, searchOutline, heartOutline, calendarOutline, restaurantOutline, snowOutline, timeOutline });
  }
}
