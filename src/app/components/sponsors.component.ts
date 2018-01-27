import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  templateUrl: './sponsors.component.html'
})
export class SponsorsComponent {
  constructor(public dataContext: DataContext) {
  }
}
