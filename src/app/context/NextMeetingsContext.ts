import {Injectable} from '@angular/core';
import {Meeting} from '../models/Meeting.model';

@Injectable()
export class NextMeetingsContext {
  public latestMeetings = new Array<Meeting>();
  public nextMeetings = new Array<Meeting>();
}

