import {Component, Input} from '@angular/core';
import {Meeting} from '../models/Meeting.model';
import {SpeechOptions} from '../models/SpeechOptions.model';
import {TranslationService} from '../translations/TranslationService';
import {Speech} from '../models/Speech.model';
import {AppContext} from '../context/AppContext';

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
  public fileUrlPrefix: string;

  constructor(appContext: AppContext, translationService: TranslationService) {
    this.lang = translationService.lang;
    this.fileUrlPrefix = appContext.config.fileUrlPrefix;
  }

  convertIntoMatrix = function (speeches: Speech[]) {
    if (!speeches || speeches.length === 0) {
      return [];
    }
    const size = speeches.length;

    if (size < 6) {
      return [speeches];
    }

    if (size < 8) {
      return [speeches.slice(0, 3), speeches.slice(3, size)];
    }

    return [speeches.slice(0, 4), speeches.slice(4, size)];
  }
}
