import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonItem, IonContent, IonInput, IonTextarea, IonLabel, IonSelect, IonSelectOption, IonIcon } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  standalone: true,
  imports: [IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonButton, IonItem, IonContent, IonInput, IonTextarea, IonLabel, IonSelect, IonSelectOption, IonIcon, FormsModule, CommonModule],
})
export class CreateTaskComponent implements OnInit {

  categories: any[] = [];
  selectedCategory!: string;
  tasks: any[] = [];

  onWillDismiss(event: any) {
    console.log(event);
  }

  @ViewChild('mainModal') modal!: IonModal;
  name!: string;
  description!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  @Output() tareaCreada = new EventEmitter<any>();

  confirm() {
    if (!this.name || !this.description || !this.selectedCategory) return;

    const newTask = {
      id: uuidv4(),
      name: this.name,
      description: this.description,
      category: this.selectedCategory,
      createdAt: new Date().toISOString(),
      completed: false
    };

    const data = localStorage.getItem('tasks');
    this.tasks = data ? JSON.parse(data) : [];

    this.tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(this.tasks));

    this.tareaCreada.emit(newTask);
    this.modal.dismiss(newTask, 'confirm');

    this.name = '';
    this.description = '';
    this.selectedCategory = '';
  }


  @ViewChild('modalCategory') modalCategory!: IonModal;
  nameCategory!: string;

  cancelCategory() {
    this.modalCategory.dismiss(null, 'cancel');
  }

  confirmCategory() {
    const nuevaCategoria = {
      id: uuidv4(),
      name: this.nameCategory
    };

    this.categories.push(nuevaCategoria);

    localStorage.setItem('categories', JSON.stringify(this.categories));

    this.modalCategory.dismiss(nuevaCategoria, 'confirmcategory');

    this.nameCategory = '';
  }


  constructor() { }

  ngOnInit() {
    const data = localStorage.getItem('categories');
    this.categories = data ? JSON.parse(data) : [];

    const tasksData = localStorage.getItem('tasks');
    this.tasks = tasksData ? JSON.parse(tasksData) : [];
    console.log(this.tasks);
  }

}
