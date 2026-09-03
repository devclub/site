import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '../translations/TranslatePipe';
import { DcMeetingInfoBlockComponent } from '../components/dc-meeting-info-block.component';
import {Meeting} from '../models/Meeting.model';
import {NextMeetingsContext} from '../context/NextMeetingsContext';

@Component({
  imports: [CommonModule, RouterLink, FontAwesomeModule, TranslatePipe, DcMeetingInfoBlockComponent],
  selector: 'dc-meeting-block',
  templateUrl: './dc-meeting-block.component.html',
  styleUrls: ['./dc-meeting-block.component.css']
})
export class DcMeetingBlockComponent {
  public nextMeetings = new Array<Meeting>();

  constructor(nextMeetingsContext: NextMeetingsContext) {
    this.nextMeetings.push(...nextMeetingsContext.nextMeetings);
  }
}
