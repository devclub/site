import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../models';

@Component({
  selector: 'team-rows',
  templateUrl: './team-rows.html'
})
export class TeamRows {
  @Input() public memberRows: Array<Member[]>;
}
