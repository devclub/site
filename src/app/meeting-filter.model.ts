import {BestGroupBy} from './page-archive/best/best-groups-by.model';

export class MeetingFilter {
  public bestGroupBy = BestGroupBy.PLACE;
  public season: number;
  public speaker: string;
  public texts: string;
  public label: string;
}
