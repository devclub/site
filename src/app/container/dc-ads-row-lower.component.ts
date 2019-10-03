import {Component} from '@angular/core';
import {AdvertisingCompany} from '../models/AdvertisingCompany.model';
import {AppContext} from '../context/AppContext';

@Component({
  selector: 'dc-ads-row-lower',
  templateUrl: './dc-ads-row-lower.component.html',
  styleUrls: ['./dc-ads-row-lower.component.css']
})
export class DcAdsRowLowerComponent {
  public companies = new Array<AdvertisingCompany>();

  constructor(appContext: AppContext) {
    this.companies.push(...appContext.advertising.companies);
  }

  trackByIndex(index: number) {
    return index;
  }
}
