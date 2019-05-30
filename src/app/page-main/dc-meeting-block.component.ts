import {Component} from '@angular/core';
import {DataContext} from '../common/context/data.context';

@Component({
  selector: 'dc-meeting-block',
  templateUrl: './dc-meeting-block.component.html',
  styleUrls: ['./dc-meeting-block.component.css']
})
export class DcMeetingBlockComponent {
  public styleColor: string;
  constructor(public dataContext: DataContext) {
    this.styleColor = dataContext.config.lightColor;
  }
}
