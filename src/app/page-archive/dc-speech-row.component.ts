import {Component, Input} from '@angular/core';
import {DataContext} from '../context/data.context';
import {Speech} from '../models/Speech.model';
import {SpeechOptions} from '../models/SpeechOptions.model';
import {TranslationService} from '../translations/TranslationService';

@Component({
  selector: 'dc-speech-row',
  templateUrl: './dc-speech-row.component.html'
})
export class DcSpeechRowComponent {
  @Input() public speech: Speech;
  @Input() public options: SpeechOptions;
  public lang: string;
  public fileUrlPrefix: string;

  constructor(public dataContext: DataContext,
              public translationService: TranslationService) {
    this.lang = translationService.lang;
    this.fileUrlPrefix = dataContext.config.fileUrlPrefix;
  }
}
