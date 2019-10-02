import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {DcAboutPageComponent} from './page-about/dc-about-page.component';
import {DcArchiveContainerPageComponent} from './page-archive/dc-archive-container.component';
import {DcSpeakerPageComponent} from './page-speaker/dc-speaker-page.component';
import {DataContext} from './context/data.context';
import {DcContainerComponent} from './container/dc-container.component';
import {LocalizePipe} from './translations/LocalizePipe';
import {DcMeetingInfoBlockComponent} from './components/dc-meeting-info-block.component';
import {DcAdsRowLowerComponent} from './container/dc-ads-row-lower.component';
import {DcTeamRowsComponent} from './container/dc-team-rows.component';
import {AppRoutes} from './app.routes';
import {DcRessourcesComponent} from './components/dc-ressources.component';
import {DcTitleRowComponent} from './components/dc-title-row.component';
import {ArchivePageGuard} from './page-archive/services/archive.guard';
import {DcArchiveMainPageComponent} from './page-archive/dc-archive-main-page.component';
import {DcArchiveBestPageComponent} from './page-archive/dc-archive-best-page.component';
import {DcArchiveSpeakerPageComponent} from './page-archive/dc-archive-speaker-page.component';
import {DcArchiveSeminarPageComponent} from './page-archive/dc-archive-seminar-page.component';
import {ArchiveTabState} from './page-archive/services/archive.tab.state';
import {ArchiveSeminarPageGuard} from './page-archive/services/archive.seminar.guard';
import {TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
import {DcAdsRowUpperComponent} from './container/dc-ads-row-upper.component';
import {DcMainPageComponent} from './page-main/dc-main-page.component';
import {DcAdvertisingPageComponent} from './page-advertising/dc-advertising-page.component';
import {CachedHttpService} from './services/CachedHttpService';
import {DcSocialYoutubeBlockComponent} from './container/dc-social-youtube-block.component';
import {DcMeetingBlockComponent} from './page-main/dc-meeting-block.component';
import {DcLatestVideosBlockComponent} from './page-main/dc-latest-videos-block.component';
import {DcShortInfoBlockComponent} from './page-about/dc-short-info-block.component';
import {DcMeetingInfoListComponent} from './page-archive/dc-meeting-info-list.component';
import {DcSpeechRowComponent} from './page-archive/dc-speech-row.component';
import {GoogleAnalyticsService} from './services/GoogleAnalyticsService';
import {TranslationService} from './translations/TranslationService';
import {TranslatePipe} from './translations/TranslatePipe';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {
  faAngleLeft,
  faAngleRight,
  faCalendarAlt,
  faCamera,
  faClock,
  faComments,
  faDesktop,
  faEnvelope,
  faExpandArrowsAlt,
  faExternalLinkSquareAlt,
  faFileAlt,
  faHome,
  faInfoCircle,
  faLanguage,
  faLocationArrow,
  faMap,
  faRss,
  faTags,
  faTh,
  faThList,
  faTimes,
  faTrophy,
  faUser,
  faVideoSlash
} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faGithub, faSlideshare, faTwitter, faWordpress, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataUtil} from './context/data.util';
import {DataHttpService} from './services/DataHttpService';
import {AppContext} from './context/AppContext';
import {ArchiveContext} from './context/ArchiveContext';
import {NextMeetingsContext} from './context/NextMeetingsContext';

export function initialize(dataHttpService: DataHttpService, appContext: AppContext, archiveContext: ArchiveContext) {
  return () => {
    return dataHttpService.getInitial().then(
      result => {
        appContext.config = result[0];
        appContext.advertising = result[1];
        appContext.team = result[2];
        archiveContext.meetings.push(...result[3]);
      });
  };
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DcContainerComponent,
    DcMainPageComponent,
    DcMeetingBlockComponent,
    DcSocialYoutubeBlockComponent,
    DcShortInfoBlockComponent,
    DcLatestVideosBlockComponent,
    DcArchiveContainerPageComponent,
    DcArchiveMainPageComponent,
    DcArchiveBestPageComponent,
    DcArchiveSpeakerPageComponent,
    DcArchiveSeminarPageComponent,
    DcAdvertisingPageComponent,
    DcAboutPageComponent,
    DcAdsRowUpperComponent,
    DcAdsRowLowerComponent,
    DcMeetingInfoBlockComponent,
    DcMeetingInfoListComponent,
    DcSpeechRowComponent,
    DcSpeakerPageComponent,
    DcTeamRowsComponent,
    DcTitleRowComponent,
    DcRessourcesComponent,
    TranslatePipe,
    LocalizePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(AppRoutes, {useHash: true, preloadingStrategy: PreloadAllModules}),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initialize, deps: [DataHttpService, AppContext, ArchiveContext], multi: true},
    ArchivePageGuard,
    ArchiveSeminarPageGuard,
    ArchiveTabState,
    AppContext,
    ArchiveContext,
    NextMeetingsContext,
    DataContext,
    DataUtil,
    TranslationService,
    DataHttpService,
    CachedHttpService,
    GoogleAnalyticsService,
    TranslatePipe,
    LocalizePipe
  ]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTimes);
    library.addIcons(faCalendarAlt);
    library.addIcons(faClock);
    library.addIcons(faHome);
    library.addIcons(faMap);
    library.addIcons(faExpandArrowsAlt);
    library.addIcons(faCamera);
    library.addIcons(faExternalLinkSquareAlt);
    library.addIcons(faInfoCircle);
    library.addIcons(faTrophy);
    library.addIcons(faFileAlt);
    library.addIcons(faYoutube);
    library.addIcons(faSlideshare);
    library.addIcons(faLocationArrow);
    library.addIcons(faUser);
    library.addIcons(faVideoSlash);
    library.addIcons(faTh);
    library.addIcons(faThList);
    library.addIcons(faAngleRight);
    library.addIcons(faAngleLeft);
    library.addIcons(faRss);
    library.addIcons(faComments);
    library.addIcons(faDesktop);
    library.addIcons(faEnvelope);
    library.addIcons(faGithub);
    library.addIcons(faWordpress);
    library.addIcons(faTwitter);
    library.addIcons(faFacebook);
    library.addIcons(faTags);
    library.addIcons(faLanguage);
  }
}
