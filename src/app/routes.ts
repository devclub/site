import {Routes} from '@angular/router';
import {AboutPage} from './pages/about';
import {ArchiveContainerPage} from './pages/archive/archive-container';
import {MainPage} from './pages/main';
import {SpeakerPage} from './pages/speaker';
import {AdvertisingPage} from './pages/advertising';
import {Container} from './components/container';
import {ArchivePageGuard} from './pages/archive/archive.guard';
import {ArchiveMainPage} from './pages/archive/archive-main';
import {ArchiveBestPage} from './pages/archive/archive-best';
import {ArchiveSpeakerPage} from './pages/archive/archive-speaker';
import {ArchiveSeminarPage} from './pages/archive/archive-seminar';
import {ArchiveSeminarPageGuard} from './pages/archive/archive.seminar.guard';

export const ROUTES: Routes = [
  {
    path: '',
    component: Container,
    children: [
      {path: '', pathMatch: 'full', component: MainPage},
      {
        path: 'archive',
        component: ArchiveContainerPage,
        canActivate: [ArchivePageGuard],
        children: [
          {path: '', component: ArchiveMainPage},
          {path: 'best', component: ArchiveBestPage},
          {path: 'speaker', component: ArchiveSpeakerPage},
          {path: 'seminar', component: ArchiveSeminarPage, canActivate: [ArchiveSeminarPageGuard]}
        ]
      },
      {path: 'advertising', component: AdvertisingPage},
      {path: 'about', component: AboutPage},
      {path: 'speaker', component: SpeakerPage}
    ]
  }
];

