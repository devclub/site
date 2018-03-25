import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  selector: 'ads-row',
  templateUrl: './ads-row.html'
})
export class AdsRow {
  constructor(public dataContext: DataContext) {
  }
}
