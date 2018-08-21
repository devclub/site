import {Component, Input} from '@angular/core';

@Component({
  selector: 'title-row',
  templateUrl: './title-row.html',
  styleUrls: ['./title-row.css']
})
export class TitleRow {
  @Input() public titleCode: String;
}
