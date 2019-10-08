import {Speaker} from './Speaker.model';
import {LocalizedTexts} from './LocalizedTexts.model';
import {LocalizedTextLists} from './LocalizedTextLists.model';
import {Top} from './Top.model';
import {OrganizedSpeech} from './OrganizedSpeech.model';

export class Speech {
  hiddenByFilter = false;
  labelsAsText: string;

  youtube: Array<string>;
  youtubeUrls: Array<string>;
  speakers: Speaker[];
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  presentations: Array<string>;
  examples: Array<string>;
  labels: Array<string>;
  info: string;
  org: OrganizedSpeech;
  lang: string;
  top: Top;
}
