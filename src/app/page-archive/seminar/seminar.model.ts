import {Speaker} from '../../reuse-meeting-model/speaker.model';
import {Place} from '../../reuse-meeting-model/place.model';
import {LocalizedTexts} from '../../reuse/localized-texts.model';
import {LocalizedTextLists} from '../../reuse/localized-text-lists.model';

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
