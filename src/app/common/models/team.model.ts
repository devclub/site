import {Member} from './member.model';
import {TeamPerson} from './team-person.model';

export class Team {
  logos: string;
  team: Array<Member>;
  thanks: Array<Member>;
  persons: Map<string, TeamPerson>
}
