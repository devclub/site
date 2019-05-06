import {Component, Input} from '@angular/core';
import {DataContext} from '../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Meeting} from '../reuse-meeting-model/meeting.model';
import {SpeechOptions} from './models/speech-options.model';

@Component({
  selector: 'dc-meeting-info-block',
  templateUrl: './dc-meeting-info-block.component.html',
  styleUrls: ['./dc-meeting-info-block.component.css']
})
export class DcMeetingInfoBlockComponent {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;
  @Input() public speechOptions: SpeechOptions;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
