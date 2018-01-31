import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AboutPage } from './pages/about';
import { ArchivePage } from './pages/archive';
import { MainPage } from './pages/main';
import { SpeakerPage } from './pages/speaker';
import { CommercialPage } from './pages/commercial';
import { DataContext } from './data.context';
import { Container } from './components/container';
import { LocalizePipe } from './components/localize.pipe';
import { MeetingInfo } from './components/meeting-info';
import { CommercialRow } from './components/commercial-row';
import { TeamRows } from './components/team-rows';
import { ROUTES } from './routes';
import {Ressources} from './components/ressources';
import {TitleRow} from './components/title-row';

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
    ArchivePage,
    CommercialPage,
    AboutPage,
    CommercialRow,
    MeetingInfo,
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
    DataContext,
    DatePipe,
    LocalizePipe
  ]
})
export class AppModule {
}
