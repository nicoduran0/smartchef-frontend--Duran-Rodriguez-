import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  addOutline,
  arrowBack,
  basketOutline,
  calendarOutline,
  checkmarkOutline,
  chevronForwardOutline,
  closeCircleOutline,
  createOutline,
  eyeOffOutline,
  eyeOutline,
  flameOutline,
  heart,
  heartOutline,
  homeOutline,
  logOutOutline,
  notificationsOutline,
  personOutline,
  restaurantOutline,
  searchOutline,
  shareSocialOutline,
  snowOutline,
  star,
  starOutline,
  timeOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    addIcons({
      homeOutline,
      searchOutline,
      heartOutline,
      heart,
      calendarOutline,
      restaurantOutline,
      snowOutline,
      timeOutline,
      arrowBack,
      star,
      starOutline,
      personOutline,
      flameOutline,
      basketOutline,
      closeCircleOutline,
      addOutline,
      addCircleOutline,
      chevronForwardOutline,
      shareSocialOutline,
      checkmarkOutline,
      notificationsOutline,
      createOutline,
      eyeOutline,
      eyeOffOutline,
      logOutOutline,
      trashOutline,
    });
  }
}
