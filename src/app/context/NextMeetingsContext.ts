import {Injectable} from '@angular/core';
import {Meeting} from '../models/Meeting.model';

@Injectable()
export class NextMeetingsContext {
  public nextMeetings = new Array<Meeting>();
}

