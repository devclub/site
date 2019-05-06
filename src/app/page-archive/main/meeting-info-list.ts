import {Component, Input} from '@angular/core';
import {DataContext} from '../../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Meeting} from '../../reuse-meeting-model/meeting.model';
import {SpeechOptions} from '../../page-main/models/speech-options.model';

@Component({
  selector: 'meeting-info-list',
  templateUrl: './meeting-info-list.html'
})
export class MeetingInfoList {
  @Input() public meeting: Meeting;
  @Input() public speechOptions: SpeechOptions;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
