import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonMenu, IonHeader, IonButtons, IonToolbar, IonContent, IonTitle, IonMenuButton, IonItem, IonLabel, IonList, IonMenuToggle } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonButtons, IonToolbar, IonContent, IonTitle, IonMenuButton, IonItem, IonLabel, IonList, IonMenuToggle, RouterLink],
})
export class AppComponent {
  constructor() {}
}
