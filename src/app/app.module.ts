import {CommonModule, DatePipe} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {AboutPage} from './page-about/about';
import {ArchiveContainerPage} from './page-archive/archive-container';
import {SpeakerPage} from './page-speaker/speaker';
import {DataContext} from './data/data.context';
import {DcContainerComponent} from './container/dc-container.component';
import {LocalizePipe} from './reuse/localize.pipe';
import {DcMeetingInfoBlockComponent} from './reuse-meeting-info-block/dc-meeting-info-block.component';
import {DcAdsRowLowerComponent} from './reuse-advertising/dc-ads-row-lower.component';
import {DcTeamRowsComponent} from './container/dc-team-rows.component';
import {AppRoutes} from './app.routes';
import {DcRessourcesComponent} from './reuse-resources/dc-ressources.component';
import {TitleRow} from './reuse/title-row';
import {ArchivePageGuard} from './page-archive/archive.guard';
import {ArchiveMainPage} from './page-archive/main/archive-main';
import {ArchiveBestPage} from './page-archive/best/archive-best';
import {ArchiveSpeakerPage} from './page-archive/speaker/archive-speaker';
import {ArchiveSeminarPage} from './page-archive/seminar/archive-seminar';
import {ArchiveTabState} from './page-archive/archive.tab.state';
import {SpeechRow} from './page-archive/main/speech-row';
import {ArchiveSeminarPageGuard} from './page-archive/archive.seminar.guard';
import {TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
import {MeetingInfoList} from './page-archive/main/meeting-info-list';
import {DcAdsRowUpperComponent} from './reuse-advertising/dc-ads-row-upper.component';
import {DcMainPageComponent} from './page-main/dc-main-page.component';
import {DcAdvertisingPageComponent} from './page-advertising/dc-advertising-page.component';
import {CachedHttpService} from './data/cached-http.service';
import {DcSocialBlockComponent} from './page-main/dc-social-block.component';
import {DcSocialYoutubeBlockComponent} from './container/dc-social-youtube-block.component';
import {DcMeetingBlockComponent} from './page-main/dc-meeting-block.component';
import {DcLatestVideosBlockComponent} from './page-main/dc-latest-videos-block.component';
import {DcShortInfoBlockComponent} from './page-main/dc-short-info-block.component';

export function initialize(configContext: DataContext) {
  return () => {
    return configContext.initialize();
  };
}

export class DevclubTranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient) {
  }

  public getTranslation(lang: string): any {
    return this.http.get('assets/i18n/' + lang + '.json');
  }
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
    DcSocialBlockComponent,
    DcLatestVideosBlockComponent,
    ArchiveContainerPage,
    ArchiveMainPage,
    ArchiveBestPage,
    ArchiveSpeakerPage,
    ArchiveSeminarPage,
    DcAdvertisingPageComponent,
    AboutPage,
    DcAdsRowUpperComponent,
    DcAdsRowLowerComponent,
    DcMeetingInfoBlockComponent,
    MeetingInfoList,
    SpeechRow,
    SpeakerPage,
    DcTeamRowsComponent,
    TitleRow,
    DcRessourcesComponent,
    LocalizePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes, {useHash: true, preloadingStrategy: PreloadAllModules}),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http) => new DevclubTranslateHttpLoader(http),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: initialize, deps: [DataContext], multi: true},
    ArchivePageGuard,
    ArchiveSeminarPageGuard,
    ArchiveTabState,
    DataContext,
    CachedHttpService,
    DatePipe,
    LocalizePipe
  ]
})
export class AppModule {
}
