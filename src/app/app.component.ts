import {Component} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DataContext} from './data.context';
import * as fontawesome from '@fortawesome/fontawesome';
import {
  faCalendarAlt,
  faCamera,
  faClock,
  faComments,
  faDesktop,
  faExternalLinkAlt,
  faHome,
  faInfoCircle,
  faLocationArrow,
  faRss,
  faUser
} from '@fortawesome/fontawesome-free-solid';
import {faGithub, faGooglePlusG, faTwitter, faWordpress, faYoutube} from '@fortawesome/fontawesome-free-brands';
import {faEnvelope} from '@fortawesome/fontawesome-free-regular';

fontawesome.library.add(
  faRss, faComments, faCamera, faDesktop, faCalendarAlt, faClock, faEnvelope, faInfoCircle, faUser,
  faGithub, faYoutube, faTwitter, faWordpress, faGooglePlusG, faHome, faLocationArrow, faExternalLinkAlt);

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private dataContext: DataContext,
              private translate: TranslateService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(
      params => {
        let language = params['lang'];
        language = language ? language : dataContext.config.defaultLang;
        this.translate.use(language);
        this.translate.reloadLang(language);
      }
    );
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
