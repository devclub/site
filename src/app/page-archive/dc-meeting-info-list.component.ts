import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DcTooltipDirective } from '../shared/tooltip.directive';
import { DcSpeechRowComponent } from './dc-speech-row.component';
import { TranslatePipe } from '../translations/TranslatePipe';
import { LocalizePipe } from '../translations/LocalizePipe';
import { LocalizeOrgPipe } from '../translations/LocalizeOrgPipe';
import {Meeting} from '../models/Meeting.model';
import {SpeechOptions} from '../models/SpeechOptions.model';

@Component({
  imports: [CommonModule, FontAwesomeModule, DcTooltipDirective, DcSpeechRowComponent, TranslatePipe, LocalizePipe, LocalizeOrgPipe],
  selector: 'dc-meeting-info-list',
  templateUrl: './dc-meeting-info-list.component.html'
})
export class DcMeetingInfoListComponent {
  @Input() public meeting: Meeting;
  @Input() public speechOptions: SpeechOptions;

  trackByMeetingIdAndIndex(index: number) {
    return (this.meeting ? this.meeting.num : 0) + '::' + index;
  }
}
