import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';

@Component({
  templateUrl: './dc-main-page.component.html'
})
export class DcMainPageComponent {
  constructor(public dataContext: DataContext) {
  }
}
