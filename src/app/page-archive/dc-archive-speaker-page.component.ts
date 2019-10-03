import {Component} from '@angular/core';
import {SpeakerTabItem} from '../models/SpeakerTabItem.model';
import {TranslationService} from '../translations/TranslationService';
import {AppContext} from '../context/AppContext';
import {ArchiveContext} from '../context/ArchiveContext';

@Component({
  templateUrl: './dc-archive-speaker-page.component.html'
})
export class DcArchiveSpeakerPageComponent {
  public speakers: Array<SpeakerTabItem>;
  public hasBestTab = false;

  constructor(private translationService: TranslationService, appContext: AppContext, archiveContext: ArchiveContext) {
    this.hasBestTab = appContext.config.hasTop;
    this.speakers = Array.from(archiveContext.speakers.values());
    this.sortByDate();
  }

  trackByIndex(index: number) {
    return index;
  }

  sortByDate() {
    this.sort((s1, s2) => s1.date.getTime() > s2.date.getTime() ? -1 : 1);
  }

  sortByName() {
    const lang = this.translationService.lang;
    this.sort((s1, s2) => s1.names[lang] > s2.names[lang] ? 1 : -1);
  }

  sortByCount() {
    this.sort((s1, s2) => s1.speechCount > s2.speechCount ? -1 : 1);
  }

  sortByTop() {
    this.sort((s1, s2) => {
      if (s1.top1 !== s2.top1) {
        return s1.top1 > s2.top1 ? -1 : 1;
      }
      if (s1.top2 !== s2.top2) {
        return s1.top2 > s2.top2 ? -1 : 1;
      }
      if (s1.top3 !== s2.top3) {
        return s1.top3 > s2.top3 ? -1 : 1;
      }
      if (s1.topOther !== s2.topOther) {
        return s1.topOther > s2.topOther ? -1 : 1;
      }
      return s1.speechCount > s2.speechCount ? -1 : 1;
    });
  }

  sort(compareFn) {
    this.speakers = this.speakers.sort(compareFn);
  }
}
