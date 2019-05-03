import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../reuse/lang.model';
import {DataResourcesCommon} from '../reuse-resources/data.resources.common';
import {DataResourcesEu} from '../reuse-resources/data.resources.eu';
import {DataResourcesEe} from '../reuse-resources/data.resources.ee';

@Component({
  templateUrl: './about.html'
})
export class AboutPage {
  public DataResourcesCommon = DataResourcesCommon;
  public DataResourcesEu = DataResourcesEu;
  public DataResourcesEe = DataResourcesEe;
  public calendarUrl: SafeResourceUrl;

  constructor(public dataContext: DataContext,
              private translate: TranslateService,
              private sanitizer: DomSanitizer) {
    const langParamValue = translate.currentLang === Lang.RU ? 'ru' : 'en';
    const template = DataResourcesCommon.googlecalendarUrlTemplate.replace('{langParam}', langParamValue);
    this.calendarUrl = this.sanitizer.bypassSecurityTrustResourceUrl(template);
  }
}
