import {Routes} from '@angular/router';
import {DcAboutPageComponent} from './page-about/dc-about-page.component';
import {DcArchiveContainerPageComponent} from './page-archive/dc-archive-container.component';
import {DcSpeakerPageComponent} from './page-speaker/dc-speaker-page.component';
import {DcContainerComponent} from './container/dc-container.component';
import {ArchivePageGuard} from './page-archive/services/archive.guard';
import {DcArchiveMainPageComponent} from './page-archive/dc-archive-main-page.component';
import {DcArchiveBestPageComponent} from './page-archive/dc-archive-best-page.component';
import {DcArchiveSpeakerPageComponent} from './page-archive/dc-archive-speaker-page.component';
import {DcArchiveSeminarPageComponent} from './page-archive/dc-archive-seminar-page.component';
import {ArchiveSeminarPageGuard} from './page-archive/services/archive.seminar.guard';
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
        component: DcArchiveContainerPageComponent,
        canActivate: [ArchivePageGuard],
        children: [
          {path: '', component: DcArchiveMainPageComponent},
          {path: 'best', component: DcArchiveBestPageComponent},
          {path: 'speaker', component: DcArchiveSpeakerPageComponent},
          {path: 'seminar', component: DcArchiveSeminarPageComponent, canActivate: [ArchiveSeminarPageGuard]}
        ]
      },
      {path: 'advertising', component: DcAdvertisingPageComponent},
      {path: 'about', component: DcAboutPageComponent},
      {path: 'speaker', component: DcSpeakerPageComponent}
    ]
  }
];

