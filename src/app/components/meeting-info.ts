import { Component, Input } from '@angular/core';
import { DataContext } from '../data.context';
import { Meeting } from '../models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'meeting-info',
  templateUrl: './meeting-info.html'
})
export class MeetingInfo {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;

  constructor(public dataContext: DataContext,
              private translate: TranslateService) {
  }

  isActiveLanguage(lang: string) {
    return this.translate.currentLang === lang;
  }
}
