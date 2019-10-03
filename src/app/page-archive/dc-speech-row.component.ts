import {Component, Input} from '@angular/core';
import {Speech} from '../models/Speech.model';
import {SpeechOptions} from '../models/SpeechOptions.model';
import {TranslationService} from '../translations/TranslationService';
import {AppContext} from '../context/AppContext';

@Component({
  selector: 'dc-speech-row',
  templateUrl: './dc-speech-row.component.html'
})
export class DcSpeechRowComponent {
  @Input() public speech: Speech;
  @Input() public options: SpeechOptions;
  public lang: string;
  public fileUrlPrefix: string;

  constructor(appContext: AppContext, translationService: TranslationService) {
    this.lang = translationService.lang;
    this.fileUrlPrefix = appContext.config.fileUrlPrefix;
  }
}
