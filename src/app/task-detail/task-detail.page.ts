import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonContent, IonCheckbox, IonFooter, IonButtons, IonToolbar, IonButton, IonHeader, IonMenuButton, IonTitle, IonIcon, IonItem, IonInput, IonModal, IonLabel, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { pencilOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

addIcons({ pencilOutline });

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
  standalone: true,
  imports: [IonContent, IonCheckbox, IonFooter, IonButtons, IonToolbar, IonButton, IonHeader, IonMenuButton, IonTitle, FormsModule, CommonModule, IonIcon, IonItem, IonInput, IonModal, IonLabel, IonSelect, IonSelectOption]
})
export class TaskDetailPage implements OnInit {
  @ViewChild('modalCategory', { static: false }) modalCategory!: IonModal;
  @ViewChild('modalCategoryCreate', { static: false }) modalCategoryCreate!: IonModal;

  task: any;

  categories: any[] = [];
  selectedCategorie: string = '';
  nameCategory: string = '';

  name: string = '';
  description: string = '';

  editModeName: boolean = false;
  editModeDescription: boolean = false;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras.state?.['task'];
    this.name = this.task.name;
    this.description = this.task.description;
    this.selectedCategorie = this.task.category;
  }

  guardarCambiosNombre() {
    if (this.task.name !== this.name) {
      this.task.name = this.name;

      const tareas = JSON.parse(localStorage.getItem('tasks') || '[]');
      const index = tareas.findIndex((t: any) => t.id === this.task.id);

      if (index !== -1) {
        tareas[index].name = this.task.name;
        localStorage.setItem('tasks', JSON.stringify(tareas));
      }
    }

    this.editModeName = false;
  }

  guardarCambiosDescripcion() {
    if (this.task.description !== this.description) {
      this.task.description = this.description;

      const tareas = JSON.parse(localStorage.getItem('tasks') || '[]');
      const index = tareas.findIndex((t: any) => t.id === this.task.id);

      if (index !== -1) {
        tareas[index].description = this.task.description;
        localStorage.setItem('tasks', JSON.stringify(tareas));
      }
    }

    this.editModeDescription = false;
  }

  guardarCambiosCategoria() {
    console.log(this.selectedCategorie);
    if (this.selectedCategorie !== '') {
      const tareas = JSON.parse(localStorage.getItem('tasks') || '[]');
      const index = tareas.findIndex((t: any) => t.id === this.task.id);
      if (index !== -1) {
        tareas[index].category = this.selectedCategorie;
        localStorage.setItem('tasks', JSON.stringify(tareas));
        console.log(tareas);
      }
    }


    this.modalCategory.dismiss();
  }

  confirmCategory() {
    const nuevaCategoria = {
      id: uuidv4(),
      name: this.nameCategory
    };

    this.categories.push(nuevaCategoria);

    localStorage.setItem('categories', JSON.stringify(this.categories));
    this.modalCategoryCreate.dismiss();
  }


  async eliminarTarea() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar la tarea "${this.task.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.confirmarEliminar();
          }
        }
      ]
    });

    await alert.present();
  }

  guardarEstado(task: any) {
    const tareas = JSON.parse(localStorage.getItem('tasks') || '[]');
    const index = tareas.findIndex((t: any) => t.id === task.id);
    if (index > -1) {
      tareas[index].completed = task.completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tareas));
  }

  confirmarEliminar() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    const filteredTasks = tasks.filter((t: any) => t.id !== this.task.id);
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    this.volver();
  }

  volver() {
    this.router.navigate(['/main'], { state: { reload: true } });
  }

  ngOnDestroy() {
    this.task = null;
    this.name = '';
    this.description = '';
    this.editModeName = false;
    this.editModeDescription = false;
    this.selectedCategorie = '';
  }

  ngOnViewWillEnter() {
    const navigation = this.router.getCurrentNavigation();
    this.task = navigation?.extras.state?.['task'];
  }
}