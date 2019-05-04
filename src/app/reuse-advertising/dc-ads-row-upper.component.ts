import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';

@Component({
  selector: 'dc-ads-row-upper',
  templateUrl: './dc-ads-row-upper.html',
  styleUrls: ['./dc-ads-row-upper.css']
})
export class DcAdsRowUpperComponent {
  constructor(public dataContext: DataContext) {
  }
}
