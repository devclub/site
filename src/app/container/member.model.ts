import {LocalizedTexts} from '../reuse/localized-texts.model';

export class Member {
  row: number;
  col: number;
  names: LocalizedTexts;
  image: string;
  imageUrl: string;
  url: string;
  emptyCell = false;
}
