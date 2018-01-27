import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../models';

@Component({
  selector: 'team-rows',
  templateUrl: './team-rows.component.html'
})
export class TeamRowsComponent {
  @Input() public sectionTitle: string;
  @Input() public memberRows: Array<Member[]>;
}
