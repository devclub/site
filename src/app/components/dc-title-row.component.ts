import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'dc-title-row',
  templateUrl: './dc-title-row.component.html',
  styleUrls: ['./dc-title-row.component.css']
})
export class DcTitleRowComponent {
  @Input() public titleCode: String;
  // The page-level <h1> must remain exactly one per page (§5.5): on `/` it is
  // the meeting title, elsewhere it is the first dc-title-row.
  @Input() public level: 1 | 2 = 2;
}
