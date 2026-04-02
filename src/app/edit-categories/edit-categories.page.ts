import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonButton, IonIcon, IonModal, IonInput } from '@ionic/angular/standalone';
import { v4 as uuidv4 } from 'uuid';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';


addIcons({
  add
});


@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.page.html',
  styleUrls: ['./edit-categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonButton, IonIcon, IonModal, IonInput]
})

export class EditCategoriesPage implements OnInit {
  @ViewChild('modalCategoryCreate', { static: false }) modalCategoryCreate!: IonModal;

  nameCategory: string = '';
  categories: any[] = [];

  eliminarCategoria(id: number) {
    this.categories = this.categories.filter(cat => cat.id !== id);
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }


  editarCategoria(_t28: number) {
    throw new Error('Method not implemented.');
  }


  constructor() { }


  confirmCategory() {
    if (this.nameCategory !== '') {
      const nuevaCategoria = {
        id: uuidv4(),
        name: this.nameCategory
      };

      this.categories.push(nuevaCategoria);

      localStorage.setItem('categories', JSON.stringify(this.categories));
      this.nameCategory = '';
      this.modalCategoryCreate.dismiss();
    }
  }


  ngOnViewWillEnter() {
    const data = localStorage.getItem('categories');
    this.categories = data ? JSON.parse(data) : [];
  }

  ngOnInit() {
    const data = localStorage.getItem('categories');
    this.categories = data ? JSON.parse(data) : [];

    console.log(this.categories);
  }

}
