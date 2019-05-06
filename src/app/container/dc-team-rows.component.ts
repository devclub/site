import {Component, Input} from '@angular/core';
import {Member} from '../data/models/member.model';

@Component({
  selector: 'dc-team-rows',
  templateUrl: './dc-team-rows.component.html',
  styleUrls: ['./dc-team-rows.component.css']
})
export class DcTeamRowsComponent {
  @Input() public memberRows: Array<Member[]>;
}
