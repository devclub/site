import {Component, Input} from '@angular/core';

@Component({
  selector: 'title-row',
  templateUrl: './title-row.html'
})
export class TitleRow {
  @Input() public titleCode: String;
}
