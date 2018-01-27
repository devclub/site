import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  templateUrl: './about.component.html'
})
export class AboutComponent {
  constructor(public dataContext: DataContext) {
  }
}
