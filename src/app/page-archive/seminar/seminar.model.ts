import {Speaker} from '../../speaker.model';
import {Place} from '../../place.model';
import {LocalizedTexts} from '../../localized-texts.model';
import {LocalizedTextLists} from '../../localized-text-lists.model';

export class Seminar {
  datetime: string;
  start: Date;
  duration_h: number;
  places: number;
  place: Place;
  url: string[];
  speakers: Speaker[];
  lang: string;
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  prices: LocalizedTexts;
  info: LocalizedTexts;
}
