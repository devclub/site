import {Component} from '@angular/core';
import {DataContext} from '../context/data.context';

@Component({
  selector: 'dc-ads-row-upper',
  templateUrl: './dc-ads-row-upper.component.html',
  styleUrls: ['./dc-ads-row-upper.component.css']
})
export class DcAdsRowUpperComponent {
  constructor(public dataContext: DataContext) {
  }

  trackByIndex(index: number) {
    return index;
  }
}
