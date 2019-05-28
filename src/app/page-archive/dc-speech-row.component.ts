import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DataContext} from '../common/context/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Speech} from '../common/models/speech.model';
import {SpeechOptions} from '../page-main/models/speech-options.model';

@Component({
  selector: 'dc-speech-row',
  templateUrl: './dc-speech-row.component.html'
})
export class DcSpeechRowComponent {
  @Input() public speech: Speech;
  @Input() public options: SpeechOptions;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
