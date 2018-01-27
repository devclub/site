import { Routes } from '@angular/router';
import { AboutComponent } from './components/about.component';
import { ArchiveComponent } from './components/archive.component';
import { MainComponent } from './components/main.component';
import { SpeakerComponent } from './components/speaker.component';
import { SponsorsComponent } from './components/sponsors.component';
import { ContainerComponent } from './reuse/container.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {path: '', pathMatch: 'full', component: MainComponent},
      {path: 'archive', component: ArchiveComponent},
      {path: 'sponsors', component: SponsorsComponent},
      {path: 'about', component: AboutComponent},
      {path: 'speaker', component: SpeakerComponent}
    ]
  }
];
