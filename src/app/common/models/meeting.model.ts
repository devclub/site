import {LocalizedTexts} from './localized-texts.model';
import {Place} from './place.model';
import {Speech} from './speech.model';
import {OrganizedMeeting} from './organized-meeting.model';

export class Meeting {
  hiddenByFilter = false;
  orgMod: string;
  orgPhoto: string;

  hidden: boolean;
  num: number;
  season: number;
  titles: LocalizedTexts;
  datetime: string;
  start: Date;
  event: string;
  place: Place;
  org: OrganizedMeeting;
  photo: string[];
  speeches: Speech[];
}
