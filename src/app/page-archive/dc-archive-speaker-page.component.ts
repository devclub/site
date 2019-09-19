import {Component} from '@angular/core';
import {ArchiveTabState} from './services/archive.tab.state';
import {DataContext} from '../common/context/data.context';
import {SpeakerTabItem} from './models/speaker-tab-item.model';
import {TranslationService} from '../common/translations/translation.service';

@Component({
  templateUrl: './dc-archive-speaker-page.component.html'
})
export class DcArchiveSpeakerPageComponent {
  public speakers: Array<SpeakerTabItem>;

  constructor(private archiveTabState: ArchiveTabState,
              private translationService: TranslationService,
              public dataContext: DataContext) {
    archiveTabState.setSpeaker();
    this.sortByDate();
  }

  trackByIndex(index: number) {
    return index;
  }

  sortByDate() {
    this.sort((s1, s2) => {
      return s1.date.getTime() > s2.date.getTime() ? -1 : 1;
    });
  }

  sortByName() {
    const lang = this.translationService.lang;
    this.sort((s1, s2) => {
      return s1.names[lang] > s2.names[lang] ? 1 : -1;
    });
  }

  sortByCount() {
    this.sort((s1, s2) => {
      return s1.speechCount > s2.speechCount ? -1 : 1;
    });
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
    this.speakers = Array.from(this.dataContext.speakers.values()).sort(compareFn);
  }
}
