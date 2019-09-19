import {Speaker} from './speaker.model';
import {LocalizedTexts} from './localized-texts.model';
import {LocalizedTextLists} from './localized-text-lists.model';
import {Top} from './top.model';

export class Speech {
  hiddenByFilter = false;
  youtube: string[];
  youtubeUrls: string[];
  speakers: Speaker[];
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  presentations: string[];
  examples: string[];
  labels: string[];
  info: string;
  lang: string;
  top: Top;
}
