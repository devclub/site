import { Routes } from '@angular/router';
import { AboutPage } from './pages/about';
import { ArchivePage } from './pages/archive';
import { MainPage } from './pages/main';
import { SpeakerPage } from './pages/speaker';
import { CommercialPage } from './pages/commercial';
import { Container } from './components/container';

export const ROUTES: Routes = [
  {
    path: '',
    component: Container,
    children: [
      {path: '', pathMatch: 'full', component: MainPage},
      {path: 'archive', component: ArchivePage},
      {path: 'sponsors', component: CommercialPage},
      {path: 'about', component: AboutPage},
      {path: 'speaker', component: SpeakerPage}
    ]
  }
];
