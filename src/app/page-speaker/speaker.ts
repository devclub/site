import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../lang.model';

@Component({
  templateUrl: './speaker.html'
})
export class SpeakerPage {
  public Lang = Lang;

  constructor(public dataContext: DataContext,
              public translate: TranslateService) {
  }
}