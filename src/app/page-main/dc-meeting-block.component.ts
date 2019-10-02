import {Component} from '@angular/core';
import {Meeting} from '../models/Meeting.model';
import {AppContext} from '../context/AppContext';
import {NextMeetingsContext} from '../context/NextMeetingsContext';

@Component({
  selector: 'dc-meeting-block',
  templateUrl: './dc-meeting-block.component.html',
  styleUrls: ['./dc-meeting-block.component.css']
})
export class DcMeetingBlockComponent {
  public styleColor: string;
  public nextMeetings = new Array<Meeting>();

  constructor(appContext: AppContext, nextMeetingsContext: NextMeetingsContext) {
    this.styleColor = appContext.config.lightColor;
    this.nextMeetings.push(...nextMeetingsContext.nextMeetings);
  }
}
