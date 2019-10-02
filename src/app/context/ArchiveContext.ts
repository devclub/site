import {Injectable} from '@angular/core';
import {Seminar} from '../models/Seminar.model';
import {Meeting} from '../models/Meeting.model';
import {LabelItem} from '../models/LabelItem.model';
import {MeetingFilter} from '../models/MeetingFilter.model';
import {Speech} from '../models/Speech.model';
import {SpeakerTabItem} from '../models/SpeakerTabItem.model';

@Injectable()
export class ArchiveContext {
  public seminarsLoaded = false;
  public seminars = new Array<Seminar>();

  public meetingsLoaded = false;
  public meetings = new Array<Meeting>();

  public labelMap = new Map<string, LabelItem>();
  public labels = new Array<LabelItem>();

  public filter = new MeetingFilter();
  public seasons = new Array<number>();
  public best = new Array<Speech>();
  public speakers = new Map<String, SpeakerTabItem>();

  constructor() {
    this.filter.season = new Date().getFullYear();
  }
}

