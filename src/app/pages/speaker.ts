import { Component } from '@angular/core';
import {DataContext} from '../data.context';

@Component({
  templateUrl: './speaker.html'
})
export class SpeakerPage {
  constructor(public dataContext: DataContext) {
  }
}
