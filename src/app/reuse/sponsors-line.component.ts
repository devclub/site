import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  selector: 'sponsors-line',
  templateUrl: './sponsors-line.component.html'
})
export class SponsorsLineComponent {
  constructor(public dataContext: DataContext) {
  }
}
