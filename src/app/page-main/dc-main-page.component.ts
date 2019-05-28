import {Component} from '@angular/core';
import {DataContext} from '../common/context/data.context';

@Component({
  templateUrl: './dc-main-page.component.html'
})
export class DcMainPageComponent {
  constructor(public dataContext: DataContext) {
  }
}
