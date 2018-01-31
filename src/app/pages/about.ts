import {Component} from '@angular/core';
import {DataContext} from '../data.context';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../models';

@Component({
  templateUrl: './about.html'
})
export class AboutPage {
  private langParams = new Map<string, string>();
  public calendarUrl: SafeResourceUrl;
  public calendarUrlTemplate = 'https://calendar.google.com/calendar/embed' +
    '?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0' +
    '&mode=AGENDA&height=600&wkst=2&hl={langParam}&bgcolor=%23ffffff&color=%23182C57' +
    '&ctz=Europe%2FTallinn&src=fmju94mnjv0a5s70hat38evqm8%40group.calendar.google.com';

  constructor(public dataContext: DataContext,
              private translate: TranslateService,
              private sanitizer: DomSanitizer) {
    this.langParams.set(Lang.EN, 'en');
    this.langParams.set(Lang.ET, 'en');
    this.langParams.set(Lang.RU, 'ru');

    const template = this.calendarUrlTemplate
      .replace('{langParam}', this.langParams.get(translate.currentLang));
    this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(template);
  }
}
