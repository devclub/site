import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';

@Component({
  selector: 'dc-meeting-block',
  templateUrl: './dc-meeting-block.component.html',
  styleUrls: ['./dc-meeting-block.component.css']
})
export class DcMeetingBlockComponent {
  constructor(public dataContext: DataContext) {
  }
}
