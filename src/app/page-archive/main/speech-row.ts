import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DataContext} from '../../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Speech} from '../../reuse-meeting-model/speech.model';
import {SpeechOptions} from '../../page-main/models/speech-options.model';

@Component({
  selector: 'speech-row',
  templateUrl: './speech-row.html'
})
export class SpeechRow {
  @Input() public speech: Speech;
  @Input() public options: SpeechOptions;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
