import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about.component';
import { ArchiveComponent } from './components/archive.component';
import { MainComponent } from './components/main.component';
import { SpeakerComponent } from './components/speaker.component';
import { SponsorsComponent } from './components/sponsors.component';
import { DataContext } from './data.context';
import { ContainerComponent } from './reuse/container.component';
import { LocalizePipe } from './reuse/localize.pipe';
import { MeetingInfo } from './reuse/meeting.info';
import { SponsorsLineComponent } from './reuse/sponsors-line.component';
import { TeamRowsComponent } from './reuse/team-rows.component';
import { ROUTES } from './routes';

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
    ContainerComponent,
    MainComponent,
    ArchiveComponent,
    SponsorsComponent,
    AboutComponent,
    SponsorsLineComponent,
    MeetingInfo,
    SpeakerComponent,
    TeamRowsComponent,
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
      },
      isolate: false
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
