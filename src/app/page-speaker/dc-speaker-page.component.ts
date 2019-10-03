import {Component} from '@angular/core';
import {AppContext} from '../context/AppContext';

@Component({
  templateUrl: './dc-speaker-page.component.html'
})
export class DcSpeakerPageComponent {
  public speakerTalkFormUrl: string;

  constructor(appContext: AppContext) {
    this.speakerTalkFormUrl = appContext.config.speakerTalkFormUrl;
  }
}
