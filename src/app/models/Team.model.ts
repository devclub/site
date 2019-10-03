import {Member} from './Member.model';
import {TeamPerson} from './TeamPerson.model';

export class Team {
  logos: string;
  team: Array<Member>;
  thanks: Array<string>;
  persons: Map<string, TeamPerson>
}
