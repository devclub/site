import {Speaker} from '../../speaker.model';

export class SpeakerTabItem extends Speaker {
  date: Date;
  speechCount = 0;
  top1 = 0;
  top2 = 0;
  top3 = 0;
  topOther = 0;
}
