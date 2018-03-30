import {Component, Input} from '@angular/core';
import {DataContext} from '../data.context';
import {Speech} from '../models';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'speech-row',
  templateUrl: './speech-row.html'
})
export class SpeechRow {
  @Input() public speech: Speech;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}
