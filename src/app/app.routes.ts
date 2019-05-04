import {Routes} from '@angular/router';
import {AboutPage} from './page-about/about';
import {ArchiveContainerPage} from './page-archive/archive-container';
import {SpeakerPage} from './page-speaker/speaker';
import {DcContainerComponent} from './container/dc-container.component';
import {ArchivePageGuard} from './page-archive/archive.guard';
import {ArchiveMainPage} from './page-archive/main/archive-main';
import {ArchiveBestPage} from './page-archive/best/archive-best';
import {ArchiveSpeakerPage} from './page-archive/speaker/archive-speaker';
import {ArchiveSeminarPage} from './page-archive/seminar/archive-seminar';
import {ArchiveSeminarPageGuard} from './page-archive/archive.seminar.guard';
import {DcMainPageComponent} from './page-main/dc-main-page.component';
import {DcAdvertisingPageComponent} from './page-advertising/dc-advertising-page.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: DcContainerComponent,
    children: [
      {path: '', pathMatch: 'full', component: DcMainPageComponent},
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
      {path: 'advertising', component: DcAdvertisingPageComponent},
      {path: 'about', component: AboutPage},
      {path: 'speaker', component: SpeakerPage}
    ]
  }
];

