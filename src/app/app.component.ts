import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
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
import {
  faFacebook,
  faGithub,
  faSlideshare,
  faTwitter,
  faWordpress,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { TranslationService } from './translations/TranslationService';
import { AppContext } from './context/AppContext';
import { ArchiveContext } from './context/ArchiveContext';
import { NextMeetingsContext } from './context/NextMeetingsContext';
import { MeetingProcessUtil } from './util/MeetingProcessUtil';

@Component({
  selector: 'dc-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    const appContext = inject(AppContext);
    const nextMeetingsContext = inject(NextMeetingsContext);
    const archiveContext = inject(ArchiveContext);
    const translationService = inject(TranslationService);
    const router = inject(Router);
    const activatedRoute = inject(ActivatedRoute);
    const library = inject(FaIconLibrary);

    library.addIcons(
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
      faVideoSlash,
      faFacebook,
      faGithub,
      faSlideshare,
      faTwitter,
      faWordpress,
      faYoutube
    );

    appContext.processData();

    activatedRoute.queryParams.subscribe((params) => {
      const language = params['lang'] ? params['lang'] : appContext.config.defaultLang;
      translationService.setLang(language);
    });

    nextMeetingsContext.findNextMeetings(archiveContext.meetings);
    nextMeetingsContext.nextMeetings.forEach((meeting) =>
      MeetingProcessUtil.processMeetingAndSpeeches(meeting, appContext.config)
    );

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
