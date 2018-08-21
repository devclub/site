import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';

@Component({
  templateUrl: './main.html'
})
export class MainPage {
  constructor(public dataContext: DataContext) {
  }
}
