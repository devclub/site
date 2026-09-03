import {Component, HostListener, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DcTooltipDirective } from '../shared/tooltip.directive';
import { DcAdsRowUpperComponent } from '../container/dc-ads-row-upper.component';
import { TranslatePipe } from '../translations/TranslatePipe';
import { LocalizePipe } from '../translations/LocalizePipe';
import { LocalizeOrgPipe } from '../translations/LocalizeOrgPipe';
import {Meeting} from '../models/Meeting.model';
import {SpeechOptions} from '../models/SpeechOptions.model';
import {TranslationService} from '../translations/TranslationService';
import {Speech} from '../models/Speech.model';
import {AppContext} from '../context/AppContext';

@Component({
  imports: [CommonModule, FontAwesomeModule, DcTooltipDirective, DcAdsRowUpperComponent, TranslatePipe, LocalizePipe, LocalizeOrgPipe],
  selector: 'dc-meeting-info-block',
  templateUrl: './dc-meeting-info-block.component.html',
  styleUrls: ['./dc-meeting-info-block.component.css']
})
export class DcMeetingInfoBlockComponent {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;
  @Input() public speechOptions: SpeechOptions;
  // The meeting title is the page's single <h1> when this component renders
  // the home hero; everywhere else (archive listing, fullscreen promo) it
  // stays an <h2> so there is never more than one <h1> per route (§5.5).
  @Input() public headingLevel: 1 | 2 = 2;
  public lang: string;
  public fullscreen: boolean;
  public fileUrlPrefix: string;

  constructor(appContext: AppContext, translationService: TranslationService) {
    this.lang = translationService.lang;
    this.fileUrlPrefix = appContext.config.fileUrlPrefix;
  }

  @HostListener('document:keydown.escape')
  closeFullscreenOnEscape(): void {
    if (this.fullscreen) {
      this.fullscreen = false;
    }
  }

  convertIntoMatrix = function (speeches: Speech[]) {
    if (!speeches || speeches.length === 0) {
      return [];
    }
    const size = speeches.length;

    if (size < 6) {
      return [speeches];
    }

    if (size < 8) {
      return [speeches.slice(0, 3), speeches.slice(3, size)];
    }

    return [speeches.slice(0, 4), speeches.slice(4, size)];
  }
}
