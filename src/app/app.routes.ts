import { Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { InitialComponent } from './initial.component';

export const ROUTES: Routes = [
  {path: '', component: InitialComponent, canActivate: [AuthGuard], pathMatch: 'full'},
];
