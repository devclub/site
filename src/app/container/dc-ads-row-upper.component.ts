import {Component} from '@angular/core';
import {AdvertisingCompany} from '../models/AdvertisingCompany.model';
import {AppContext} from '../context/AppContext';

@Component({
  selector: 'dc-ads-row-upper',
  templateUrl: './dc-ads-row-upper.component.html',
  styleUrls: ['./dc-ads-row-upper.component.css']
})
export class DcAdsRowUpperComponent {
  public companies = new Array<AdvertisingCompany>();

  constructor(appContext: AppContext) {
    this.companies.push(...appContext.advertising.companies);
  }

  trackByIndex(index: number) {
    return index;
  }
}
