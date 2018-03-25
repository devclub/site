import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  templateUrl: './advertising.html'
})
export class AdvertisingPage {
  constructor(public dataContext: DataContext) {
  }
}
