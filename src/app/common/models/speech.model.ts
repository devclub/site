import {Speaker} from './speaker.model';
import {LocalizedTexts} from './localized-texts.model';
import {LocalizedTextLists} from './localized-text-lists.model';
import {Top} from './top.model';
import {OrganizedSpeech} from './organized-speech.model';

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
