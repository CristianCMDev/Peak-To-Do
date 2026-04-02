import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton, IonIcon, IonModal, IonItem, IonInput, IonTextarea, IonLabel, IonSelect, IonSelectOption, IonList, IonCheckbox, IonSearchbar } from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { funnelOutline } from 'ionicons/icons';


addIcons({
  add
});

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonButtons, IonMenuButton, IonButton, IonIcon, IonModal, IonItem, IonInput, IonTextarea, IonLabel, IonSelect, IonSelectOption, CreateTaskComponent, IonList, IonCheckbox, IonSearchbar]
})
export class MainPage implements OnInit {
  constructor(private router: Router) { }
  irADetalle(task: any) {
    this.router.navigate(['/task-detail'], {
      state: { task: task }
    });
  }

  @ViewChild('modalFiltro', { static: false }) modalFiltro!: IonModal;

  funnelIcon = funnelOutline;
  tasks: any[] = [];
  tasksFiltradas: any[] = [];
  categorias: any[] = []
  temporallyFilterCategories: string[] = [];
  selectedFilterCategories: string[] = [];
  searchText: string = '';

  aplicarFiltro() {
    this.filtrarTareas();
    this.modalFiltro.dismiss();
  }

  filtrarTareas() {
    const texto = this.searchText.toLowerCase();
    this.selectedFilterCategories = this.temporallyFilterCategories;
    this.tasksFiltradas = this.tasks.filter(task =>
      (this.selectedFilterCategories.length === 0 || this.selectedFilterCategories.includes(task.category)) &&
      (!texto || task.name.toLowerCase().includes(texto) || task.description.toLowerCase().includes(texto))
    );
  }

  cargarTareas() {
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
    this.categorias = JSON.parse(localStorage.getItem('categories') || '[]');
    this.filtrarTareas();
  }

  guardarEstado(task: any) {
    const tareas = JSON.parse(localStorage.getItem('tasks') || '[]');

    const index = tareas.findIndex((t: any) => t.createdAt === task.createdAt);
    if (index > -1) {
      tareas[index].completed = task.completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tareas));
  }

  ionViewWillEnter() {
    console.log('ASasASasASassaSas');
    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];
    this.categorias = JSON.parse(localStorage.getItem('categories') || '[]');
    this.cargarTareas();
  }

  ngOnInit() {
    this.cargarTareas();
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state?.['reload']) {
      this.cargarTareas();
    }
  }

}
