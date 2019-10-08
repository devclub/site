import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GoogleAnalyticsService} from './services/GoogleAnalyticsService';
import {environment} from '../environments/environment.dev-eu';
import {TranslationService} from './translations/TranslationService';
import {AppContext} from './context/AppContext';
import {ArchiveContext} from './context/ArchiveContext';
import {NextMeetingsContext} from './context/NextMeetingsContext';
import {MeetingProcessUtil} from './util/MeetingProcessUtil';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    private appContext: AppContext,
    private nextMeetingsContext: NextMeetingsContext,
    private archiveContext: ArchiveContext,
    private translationService: TranslationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private googleAnalyticsService: GoogleAnalyticsService) {

    appContext.processData();

    activatedRoute.queryParams.subscribe(
      params => {
        let language = params['lang'];
        language = language ? language : appContext.config.defaultLang;
        this.translationService.setLang(language);
      }
    );

    nextMeetingsContext.findNextMeetings(archiveContext.meetings);
    nextMeetingsContext.nextMeetings
      .forEach(meeting => MeetingProcessUtil.processMeetingAndSpeeches(meeting, appContext.config));

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
