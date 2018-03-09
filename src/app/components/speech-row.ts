import {Component, Input} from '@angular/core';
import {DataContext} from '../data.context';
import {Speech} from '../models';

@Component({
  selector: 'speech-row',
  templateUrl: './speech-row.html'
})
export class SpeechRow {
  @Input() public speech: Speech;

  constructor(public dataContext: DataContext) {
  }
}
