import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  templateUrl: './commercial.html'
})
export class CommercialPage {
  constructor(public dataContext: DataContext) {
  }
}
