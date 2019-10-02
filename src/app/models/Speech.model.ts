import {Speaker} from './Speaker.model';
import {LocalizedTexts} from './LocalizedTexts.model';
import {LocalizedTextLists} from './LocalizedTextLists.model';
import {Top} from './Top.model';
import {OrganizedSpeech} from './OrganizedSpeech.model';

export class Speech {
  hiddenByFilter = false;
  labelsAsText: string;
  orgCam: string;
  orgEdit: string;

  youtube: string[];
  youtubeUrls: string[];
  speakers: Speaker[];
  titles: LocalizedTexts;
  descr: LocalizedTextLists;
  presentations: string[];
  examples: string[];
  labels: string[];
  info: string;
  org: OrganizedSpeech;
  lang: string;
  top: Top;
}
