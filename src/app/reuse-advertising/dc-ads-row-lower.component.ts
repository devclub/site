import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';

@Component({
  selector: 'dc-ads-row-lower',
  templateUrl: './dc-ads-row-lower.html',
  styleUrls: ['./dc-ads-row-lower.css']
})
export class DcAdsRowLowerComponent {
  constructor(public dataContext: DataContext) {
  }
}
