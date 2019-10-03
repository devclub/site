import {LocalizedTexts} from './LocalizedTexts.model';
import {Place} from './Place.model';
import {Speech} from './Speech.model';
import {OrganizedMeeting} from './OrganizedMeeting.model';

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
