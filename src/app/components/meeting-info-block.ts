import {Component, Input} from '@angular/core';
import {DataContext} from '../data.context';
import {Meeting, SpeechOptions} from '../models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'meeting-info-block',
  templateUrl: './meeting-info-block.html'
})
export class MeetingInfoBlock {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;
  @Input() public speechOptions: SpeechOptions;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
