import {Component, Input} from '@angular/core';
import {DataContext} from '../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Meeting} from '../reuse-meeting-model/meeting.model';
import {SpeechOptions} from './speech-options.model';

@Component({
  selector: 'meeting-info-block',
  templateUrl: './meeting-info-block.html',
  styleUrls: ['./meeting-info-block.css']
})
export class MeetingInfoBlock {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;
  @Input() public speechOptions: SpeechOptions;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
