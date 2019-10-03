import {Component, Input} from '@angular/core';
import {Meeting} from '../models/Meeting.model';
import {SpeechOptions} from '../models/SpeechOptions.model';

@Component({
  selector: 'dc-meeting-info-list',
  templateUrl: './dc-meeting-info-list.component.html',
  /* tslint:disable no-unused-css*/
  styles: [`
      :host >>> .tooltip-inner {
          text-align: left;
          max-width: 600px;
      }
  `]
})
export class DcMeetingInfoListComponent {
  @Input() public meeting: Meeting;
  @Input() public speechOptions: SpeechOptions;

  trackByMeetingIdAndIndex(index: number) {
    return (this.meeting ? this.meeting.num : 0) + '::' + index;
  }
}
