import {Component, Input} from '@angular/core';
import {DataContext} from '../common/context/data.context';
import {Meeting} from '../common/models/meeting.model';
import {SpeechOptions} from '../page-main/models/speech-options.model';

@Component({
  selector: 'dc-meeting-info-list',
  templateUrl: './dc-meeting-info-list.component.html'
})
export class DcMeetingInfoListComponent {
  @Input() public meeting: Meeting;
  @Input() public speechOptions: SpeechOptions;

  constructor(public dataContext: DataContext) {
  }
}
