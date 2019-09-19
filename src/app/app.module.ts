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
import {DataContext} from './common/context/data.context';
import {DcContainerComponent} from './common/container/dc-container.component';
import {LocalizePipe} from './common/translations/localize.pipe';
import {DcMeetingInfoBlockComponent} from './common/components/dc-meeting-info-block.component';
import {DcAdsRowLowerComponent} from './common/container/dc-ads-row-lower.component';
import {DcTeamRowsComponent} from './common/container/dc-team-rows.component';
import {AppRoutes} from './app.routes';
import {DcRessourcesComponent} from './common/components/dc-ressources.component';
import {DcTitleRowComponent} from './common/components/dc-title-row.component';
import {ArchivePageGuard} from './page-archive/services/archive.guard';
import {DcArchiveMainPageComponent} from './page-archive/dc-archive-main-page.component';
import {DcArchiveBestPageComponent} from './page-archive/dc-archive-best-page.component';
import {DcArchiveSpeakerPageComponent} from './page-archive/dc-archive-speaker-page.component';
import {DcArchiveSeminarPageComponent} from './page-archive/dc-archive-seminar-page.component';
import {ArchiveTabState} from './page-archive/services/archive.tab.state';
import {ArchiveSeminarPageGuard} from './page-archive/services/archive.seminar.guard';
import {TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
import {DcAdsRowUpperComponent} from './common/container/dc-ads-row-upper.component';
import {DcMainPageComponent} from './page-main/dc-main-page.component';
import {DcAdvertisingPageComponent} from './page-advertising/dc-advertising-page.component';
import {CachedHttpService} from './common/cached-http.service';
import {DcSocialYoutubeBlockComponent} from './common/container/dc-social-youtube-block.component';
import {DcMeetingBlockComponent} from './page-main/dc-meeting-block.component';
import {DcLatestVideosBlockComponent} from './page-main/dc-latest-videos-block.component';
import {DcShortInfoBlockComponent} from './page-about/dc-short-info-block.component';
import {DcMeetingInfoListComponent} from './page-archive/dc-meeting-info-list.component';
import {DcSpeechRowComponent} from './page-archive/dc-speech-row.component';
import {GoogleAnalyticsService} from './common/google-analytics.service';
import {TranslationService} from './common/translations/translation.service';
import {TranslatePipe} from './common/translations/translate.pipe';
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
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faGithub, faSlideshare, faTwitter, faWordpress, faYoutube} from '@fortawesome/free-brands-svg-icons';

export function initialize(configContext: DataContext) {
  return () => {
    return configContext.initialize();
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
    {provide: APP_INITIALIZER, useFactory: initialize, deps: [DataContext], multi: true},
    ArchivePageGuard,
    ArchiveSeminarPageGuard,
    ArchiveTabState,
    DataContext,
    TranslationService,
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
