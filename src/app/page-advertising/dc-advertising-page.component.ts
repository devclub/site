import {Component} from '@angular/core';
import {Advertising} from '../common/models/advertising.model';
import {DataContext} from '../common/context/data.context';

@Component({
  templateUrl: './dc-advertising-page.component.html'
})
export class DcAdvertisingPageComponent {
  public advertising: Advertising;

  // FIXME move to properties
  public mail = 'info@devclub.eu';
  public bank = 'Swedbank';
  public banknumber = 'EE822200221049645988';
  public bankrecipient = 'MTÜ DEVCLUB';
  public bankdescription = 'devclub.eu donation';

  constructor(dataContext: DataContext) {
    this.advertising = dataContext.advertising;
  }
}
