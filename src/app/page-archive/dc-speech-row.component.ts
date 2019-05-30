import {Component, Input} from '@angular/core';
import {DataContext} from '../common/context/data.context';
import {Speech} from '../common/models/speech.model';
import {SpeechOptions} from '../page-main/models/speech-options.model';
import {TranslationService} from '../common/translations/translation.service';

@Component({
  selector: 'dc-speech-row',
  templateUrl: './dc-speech-row.component.html'
})
export class DcSpeechRowComponent {
  @Input() public speech: Speech;
  @Input() public options: SpeechOptions;
  public lang: string;

  constructor(public dataContext: DataContext,
              public translationService: TranslationService) {
    this.lang = translationService.lang;
  }
}
