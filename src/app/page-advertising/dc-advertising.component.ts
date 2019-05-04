import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {DataResourcesCommon} from '../reuse-resources/data.resources.common';
import {Advertising} from '../data/models/advertising.model';

@Component({
  templateUrl: './dc-advertising.component.html'
})
export class DcAdvertisingPageComponent {
  public advertising: Advertising;
  public DataResourcesCommon = DataResourcesCommon;

  constructor(dataContext: DataContext) {
    this.advertising = dataContext.advertising;
  }
}
