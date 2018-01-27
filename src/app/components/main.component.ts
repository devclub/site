import { Component, OnInit } from '@angular/core';
import { DataContext } from '../data.context';
import { Meeting } from '../models';

@Component({
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  public nextMeeting: Meeting;
  public lastMeetings: Meeting[];

  constructor(public dataContext: DataContext) {
  }

  ngOnInit() {
    this.nextMeeting = this.dataContext.meetings[0];
    this.lastMeetings = [this.dataContext.meetings[1], this.dataContext.meetings[2], this.dataContext.meetings[3]];
  }
}
