import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DataContext} from './context/data.context';
import {GoogleAnalyticsService} from './services/GoogleAnalyticsService';
import {environment} from '../environments/environment.dev-eu';
import {TranslationService} from './translations/TranslationService';
import {AppContext} from './context/AppContext';
import {ArchiveContext} from './context/ArchiveContext';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private appContext: AppContext,
    private archiveContext: ArchiveContext,
    private dataContext: DataContext,
    private translationService: TranslationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private googleAnalyticsService: GoogleAnalyticsService) {

    activatedRoute.queryParams.subscribe(
      params => {
        let language = params['lang'];
        language = language ? language : appContext.config.defaultLang;
        this.translationService.setLang(language);
      }
    );

    dataContext.setConfig(appContext.config);
    dataContext.initializeBaseData(appContext.advertising, appContext.team, archiveContext.meetings);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    if (environment.googleAnalyticsKey) {
      googleAnalyticsService.appendGaTrackingCode(environment.googleAnalyticsKey);
    }
  }
}
