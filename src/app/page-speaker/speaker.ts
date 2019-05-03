import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../reuse/lang.model';
import {DataResourcesCommon} from '../reuse-resources/data.resources.common';

@Component({
  templateUrl: './speaker.html'
})
export class SpeakerPage {
  public addTopicUrl = DataResourcesCommon.addTopicGoogleForm;
}
