import {Component, Input} from '@angular/core';
import {DataContext} from '../data.context';
import {Meeting} from '../models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'meeting-info-list',
  templateUrl: './meeting-info-list.html'
})
export class MeetingInfoList {
  @Input() public meeting: Meeting;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
