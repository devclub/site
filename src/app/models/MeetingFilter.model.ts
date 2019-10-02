import {BestGroupBy} from './BestGroupBy.model';

export class MeetingFilter {
  public bestGroupBy = BestGroupBy.PLACE;
  public season: number;
  public speaker: string;
  public texts: string;
  public label: string;
}
