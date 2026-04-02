import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadComponent: () => import('./main/main.page').then(m => m.MainPage) },
  {
    path: 'edit-categories',
    loadComponent: () => import('./edit-categories/edit-categories.page').then( m => m.EditCategoriesPage)
  },
  {
    path: 'task-detail',
    loadComponent: () => import('./task-detail/task-detail.page').then( m => m.TaskDetailPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];
