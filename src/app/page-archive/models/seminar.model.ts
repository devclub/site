import {Speaker} from '../../common/models/speaker.model';
import {Place} from '../../common/models/place.model';
import {LocalizedTexts} from '../../common/models/localized-texts.model';
import {LocalizedTextLists} from '../../common/models/localized-text-lists.model';

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
