import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '../translations/TranslatePipe';
import { DcTitleRowComponent } from '../components/dc-title-row.component';
import {AppContext} from '../context/AppContext';

@Component({
  imports: [CommonModule, FontAwesomeModule, TranslatePipe, DcTitleRowComponent],
  templateUrl: './dc-speaker-page.component.html'
})
export class DcSpeakerPageComponent {
  public speakerTalkFormUrl: string;

  constructor(appContext: AppContext) {
    this.speakerTalkFormUrl = appContext.config.speakerTalkFormUrl;
  }
}
