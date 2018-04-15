import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  selector: 'ads-row',
  templateUrl: './ads-row.html',
  styleUrls: ['./ads-row.css']
})
export class AdsRow {
  constructor(public dataContext: DataContext) {
  }
}
