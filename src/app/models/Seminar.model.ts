import {Speaker} from './Speaker.model';
import {Place} from './Place.model';
import {LocalizedTexts} from './LocalizedTexts.model';
import {LocalizedTextLists} from './LocalizedTextLists.model';

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
