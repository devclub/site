import {Component, Input} from '@angular/core';
import { DataContext } from '../data/data.context';

@Component({
  selector: 'ads-row',
  templateUrl: './ads-row.html',
  styleUrls: ['./ads-row.css']
})
export class AdsRow {
  @Input()
  classStyles: string;

  constructor(public dataContext: DataContext) {
  }
}
