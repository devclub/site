import {Component} from '@angular/core';
import { DcMeetingBlockComponent } from './dc-meeting-block.component';
import { DcLatestVideosBlockComponent } from './dc-latest-videos-block.component';
import { DcShortInfoBlockComponent } from '../page-about/dc-short-info-block.component';

@Component({
  imports: [DcMeetingBlockComponent, DcLatestVideosBlockComponent, DcShortInfoBlockComponent],
  templateUrl: './dc-main-page.component.html'
})
export class DcMainPageComponent {
}
