import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {Advertising} from '../reuse-advertising/advertising.model';
import {DataResourcesCommon} from '../reuse-resources/data.resources.common';

@Component({
  templateUrl: './advertising.html'
})
export class AdvertisingPage {
  public advertising: Advertising;
  public DataResourcesCommon = DataResourcesCommon;

  constructor(dataContext: DataContext) {
    this.advertising = dataContext.advertising;
  }
}
