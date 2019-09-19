import {LocalizedTexts} from './localized-texts.model';
import {Place} from './place.model';
import {Speech} from './speech.model';

export class Meeting {
  hiddenByFilter = false;
  hidden: boolean;
  num: number;
  season: number;
  titles: LocalizedTexts;
  datetime: string;
  start: Date;
  event: string;
  place: Place;
  photo: string[];
  speeches: Speech[];
}
