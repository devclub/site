import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DcTooltipDirective } from '../shared/tooltip.directive';
import { TranslatePipe } from '../translations/TranslatePipe';
import { LocalizePipe } from '../translations/LocalizePipe';
import { LocalizeOrgPipe } from '../translations/LocalizeOrgPipe';
import {Speech} from '../models/Speech.model';
import {SpeechOptions} from '../models/SpeechOptions.model';
import {TranslationService} from '../translations/TranslationService';
import {AppContext} from '../context/AppContext';

@Component({
  imports: [CommonModule, FontAwesomeModule, DcTooltipDirective, TranslatePipe, LocalizePipe, LocalizeOrgPipe],
  selector: 'dc-speech-row',
  templateUrl: './dc-speech-row.component.html'
})
export class DcSpeechRowComponent {
  @Input() public speech: Speech;
  @Input() public options: SpeechOptions;
  public lang: string;
  public fileUrlPrefix: string;

  constructor(appContext: AppContext, translationService: TranslationService) {
    this.lang = translationService.lang;
    this.fileUrlPrefix = appContext.config.fileUrlPrefix;
  }
}
