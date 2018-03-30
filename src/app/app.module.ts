import {CommonModule, DatePipe} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {AboutPage} from './pages/about';
import {ArchiveContainerPage} from './pages/archive/archive-container';
import {MainPage} from './pages/main';
import {SpeakerPage} from './pages/speaker';
import {AdvertisingPage} from './pages/advertising';
import {DataContext} from './data.context';
import {Container} from './components/container';
import {LocalizePipe} from './components/localize.pipe';
import {MeetingInfoBlock} from './components/meeting-info-block';
import {AdsRow} from './components/ads-row';
import {TeamRows} from './components/team-rows';
import {ROUTES} from './routes';
import {Ressources} from './components/ressources';
import {TitleRow} from './components/title-row';
import {ArchivePageGuard} from './pages/archive/archive.guard';
import {ArchiveMainPage} from './pages/archive/archive-main';
import {ArchiveBestPage} from './pages/archive/archive-best';
import {ArchiveSpeakerPage} from './pages/archive/archive-speaker';
import {ArchiveSeminarPage} from './pages/archive/archive-seminar';
import {ArchiveTabState} from './pages/archive/archive.tab.state';
import {SpeechRow} from './components/speech-row';
import {ArchiveSeminarPageGuard} from './pages/archive/archive.seminar.guard';
import {TooltipModule, TypeaheadModule} from 'ngx-bootstrap';
import {MeetingInfoList} from './components/meeting-info-list';

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
    Container,
    MainPage,
    ArchiveContainerPage,
    ArchiveMainPage,
    ArchiveBestPage,
    ArchiveSpeakerPage,
    ArchiveSeminarPage,
    AdvertisingPage,
    AboutPage,
    AdsRow,
    MeetingInfoBlock,
    MeetingInfoList,
    SpeechRow,
    SpeakerPage,
    TeamRows,
    TitleRow,
    Ressources,
    LocalizePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules}),
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
    DatePipe,
    LocalizePipe
  ]
})
export class AppModule {
}
