import {Component, Input} from '@angular/core';
import {DataContext} from '../context/data.context';
import {Meeting} from '../models/meeting.model';
import {SpeechOptions} from '../../page-main/models/speech-options.model';
import {TranslationService} from '../translations/translation.service';
import {Speech} from '../models/speech.model';

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
  public fullscreen: boolean;

  constructor(public dataContext: DataContext,
              public translationService: TranslationService) {
    this.lang = translationService.lang;
  }

  convertIntoMatrix = function (speeches: Speech[]) {
    if (!speeches || speeches.length === 0) {
      return [];
    }
    const size = speeches.length;
    if (size < 5) {
      return [speeches];
    } else if (size < 7) {
      return [speeches.slice(0, 3), speeches.slice(3, size)];
    }
    return [speeches.slice(0, 4), speeches.slice(4, size)];
  }
}
