import {Component, Input} from '@angular/core';

@Component({
  selector: 'dc-title-row',
  templateUrl: './dc-title-row.component.html',
  styleUrls: ['./dc-title-row.component.css']
})
export class DcTitleRowComponent {
  @Input() public titleCode: String;
}
