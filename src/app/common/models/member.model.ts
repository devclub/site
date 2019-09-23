import {TeamPerson} from './team-person.model';

export class Member {
  emptyCell = false;
  row: number;
  col: number;
  personCode: string;

  person: TeamPerson;
  imageUrl: string;
}
