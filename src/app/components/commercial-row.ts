import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  selector: 'commercial-row',
  templateUrl: './commercial-row.html'
})
export class CommercialRow {
  constructor(public dataContext: DataContext) {
  }
}
