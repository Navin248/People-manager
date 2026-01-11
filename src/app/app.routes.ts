import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'people', pathMatch: 'full' },
    { path: 'people', loadComponent: () => import('./components/people-list/people-list.component').then(m => m.PeopleListComponent) },
    { path: 'add', loadComponent: () => import('./components/person-edit/person-edit.component').then(m => m.PersonEditComponent) },
    { path: 'edit/:id', loadComponent: () => import('./components/person-edit/person-edit.component').then(m => m.PersonEditComponent) }
];
