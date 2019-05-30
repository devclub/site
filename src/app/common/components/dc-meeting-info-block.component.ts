import {Component, Input} from '@angular/core';
import {DataContext} from '../context/data.context';
import {Meeting} from '../models/meeting.model';
import {SpeechOptions} from '../../page-main/models/speech-options.model';
import {TranslationService} from '../translations/translation.service';

@Component({
  selector: 'dc-meeting-info-block',
  templateUrl: './dc-meeting-info-block.component.html',
  styleUrls: ['./dc-meeting-info-block.component.css']
})
export class DcMeetingInfoBlockComponent {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;
  @Input() public speechOptions: SpeechOptions;
  public lang: string;

  constructor(public dataContext: DataContext,
              public translationService: TranslationService) {
    this.lang = translationService.lang;
  }
}
