import {Component} from '@angular/core';
import {DataContext} from '../common/context/data.context';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../common/models/lang.model';

@Component({
  templateUrl: './dc-about-page.component.html'
})
export class DcAboutPageComponent {
  public calendarUrl: SafeResourceUrl;

  // FIXME - move out into property
  public googlecalendarUrlTemplate = 'https://calendar.google.com/calendar/embed' +
    '?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0' +
    '&mode=AGENDA&height=600&wkst=2&hl={langParam}&bgcolor=%23ffffff&color=%23182C57' +
    '&ctz=Europe%2FTallinn&src=fmju94mnjv0a5s70hat38evqm8%40group.calendar.google.com';

  constructor(public dataContext: DataContext,
              private translate: TranslateService,
              private sanitizer: DomSanitizer) {
    const langParamValue = translate.currentLang === Lang.RU ? 'ru' : 'en';
    const template = this.googlecalendarUrlTemplate.replace('{langParam}', langParamValue);
    this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(template);
  }
}
