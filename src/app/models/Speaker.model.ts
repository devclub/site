import {LocalizedTexts} from './LocalizedTexts.model';
import {SpeakerLink} from './SpeakerLink.model';

export class Speaker {
  names: LocalizedTexts;
  titles: LocalizedTexts;
  image: string;
  imageUrl: string;
  url: string;
  links: SpeakerLink[];
}
