import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {DataContext} from './common/context/data.context';
import {GoogleAnalyticsService} from './common/google-analytics.service';
import {environment} from '../environments/environment.dev-eu';
import {TranslationService} from './common/translations/translation.service';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private dataContext: DataContext,
              private translationService: TranslationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private googleAnalyticsService: GoogleAnalyticsService) {
    activatedRoute.queryParams.subscribe(
      params => {
        let language = params['lang'];
        language = language ? language : dataContext.config.defaultLang;
        this.translationService.setLang(language);
      }
    );
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
