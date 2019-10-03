import {Injectable} from '@angular/core';
import {Meeting} from '../models/Meeting.model';

@Injectable()
export class NextMeetingsContext {
  public readonly MEETING_DURATION_IN_MS = 4 * 60 * 60 * 1000;
  public nextMeetings = new Array<Meeting>();

  public findNextMeetings(meetings: Array<Meeting>): void {
    const now = new Date().getTime();
    meetings.forEach(meeting => {
      const meetingStart = new Date(meeting.datetime);
      if (now <= meetingStart.getTime() + this.MEETING_DURATION_IN_MS) {
        this.nextMeetings.push(JSON.parse(JSON.stringify(meeting)));
      }
    });
  }
}

