import {Component} from '@angular/core';
import {Advertising} from '../common/models/advertising.model';
import {DataContext} from '../common/context/data.context';

@Component({
  templateUrl: './dc-advertising-page.component.html'
})
export class DcAdvertisingPageComponent {
  public mail;
  public advertising: Advertising;

  constructor(dataContext: DataContext) {
    this.mail = dataContext.config.resources.main.mail;
    this.advertising = dataContext.advertising;
  }

  trackByIndex(index: number) {
    return index;
  }
}
