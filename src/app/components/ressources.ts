import {Component} from '@angular/core';
import {DataContext} from '../data.context';

@Component({
  selector: 'ressources',
  templateUrl: './ressources.html'
})
export class Ressources {
  constructor(public dataContext: DataContext) {
  }
}
