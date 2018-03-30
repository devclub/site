import {Component, Input, Output, EventEmitter} from '@angular/core';
import {DataContext} from '../data.context';
import {Speech, SpeechOptions} from '../models';
import {TranslateService} from '@ngx-translate/core';

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
