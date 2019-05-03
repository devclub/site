import {Component, Input} from '@angular/core';
import {Member} from './member.model';

@Component({
  selector: 'team-rows',
  templateUrl: './team-rows.html'
})
export class TeamRows {
  @Input() public memberRows: Array<Member[]>;
}
