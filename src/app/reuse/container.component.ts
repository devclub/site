import { Component } from '@angular/core';
import { DataContext } from '../data.context';

@Component({
  templateUrl: './container.component.html'
})
export class ContainerComponent {
  public currentYear = new Date().getFullYear();

  constructor(public dataContext: DataContext) {
  }
}
