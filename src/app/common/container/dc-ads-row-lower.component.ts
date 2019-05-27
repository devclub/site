import {Component} from '@angular/core';
import {DataContext} from '../context/data.context';

@Component({
  selector: 'dc-ads-row-lower',
  templateUrl: './dc-ads-row-lower.component.html',
  styleUrls: ['./dc-ads-row-lower.component.css']
})
export class DcAdsRowLowerComponent {
  constructor(public dataContext: DataContext) {
  }
}
