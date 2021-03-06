import {Component, Input} from '@angular/core';
import {Member} from '../models/Member.model';

@Component({
  selector: 'dc-team-rows',
  templateUrl: './dc-team-rows.component.html',
  styleUrls: ['./dc-team-rows.component.css']
})
export class DcTeamRowsComponent {
  @Input() public memberRows: Array<Member[]>;

  trackByIndex(index: number) {
    return index;
  }
}
