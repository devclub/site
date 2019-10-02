import {Component} from '@angular/core';
import {Advertising} from '../models/Advertising.model';
import {AppContext} from '../context/AppContext';

@Component({
  templateUrl: './dc-advertising-page.component.html'
})
export class DcAdvertisingPageComponent {
  public mail;
  public advertising: Advertising;

  constructor(appContext: AppContext) {
    this.mail = appContext.config.resources.main.mail;
    this.advertising = appContext.advertising;
  }

  trackByIndex(index: number) {
    return index;
  }
}
