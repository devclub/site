import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../translations/TranslatePipe';
import { DcTitleRowComponent } from '../components/dc-title-row.component';
import {AppContext} from '../context/AppContext';

@Component({
  imports: [CommonModule, TranslatePipe, DcTitleRowComponent],
  templateUrl: './dc-speaker-page.component.html'
})
export class DcSpeakerPageComponent {
  public speakerTalkFormUrl: string;

  constructor(appContext: AppContext) {
    this.speakerTalkFormUrl = appContext.config.speakerTalkFormUrl;
  }
}
