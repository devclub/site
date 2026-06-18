import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizePipe } from '../translations/LocalizePipe';
import {Member} from '../models/Member.model';

@Component({
  imports: [CommonModule, LocalizePipe],
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
