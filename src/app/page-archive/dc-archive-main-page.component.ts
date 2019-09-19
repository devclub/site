import {Component} from '@angular/core';
import {ArchiveTabState} from './services/archive.tab.state';
import {DataContext} from '../common/context/data.context';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {Speaker} from '../common/models/speaker.model';
import {Meeting} from '../common/models/meeting.model';
import {TranslationService} from '../common/translations/translation.service';
import {Speech} from '../common/models/speech.model';

@Component({
  templateUrl: './dc-archive-main-page.component.html'
})
export class DcArchiveMainPageComponent {
  public readonly ALL_SEASONS = -1;
  public seasonDisabled = false;
  public asList = true;
  public meetings: Meeting[] = [];
  public speechOptions = {
    clickNameFn: (speaker: Speaker) => {
      this.dataContext.filter.speaker = speaker.names[this.translationService.lang];
      this.search();
    },
    clickLabelFn: (label: string) => {
      this.dataContext.filter.label = label;
      this.search();
    }
  };

  constructor(private archiveTabState: ArchiveTabState,
              private translationService: TranslationService,
              public dataContext: DataContext) {
    archiveTabState.setMain();
    this.meetings = this.dataContext.meetings;
    this.search();
  }

  trackById(index: number, item: Meeting) {
    return item.num;
  }

  searchByLabel(event: TypeaheadMatch) {
    this.dataContext.filter.label = event.item.name;
    this.search();
  }

  searchByLabelClear() {
    if (!this.dataContext.filter.label) {
      this.search();
    }
  }

  searchBySeason() {
    this.search();
  }

  getPlusYearText(): string {
    const index = this.dataContext.seasons.indexOf(this.dataContext.filter.season);
    if (index === 0) {
      return 'archive.main.filter.seasons.all';
    } else if (index !== -1) {
      return '+1';
    }
    return '';
  }

  getMinusYearText(): string {
    const index = this.dataContext.seasons.indexOf(this.dataContext.filter.season);
    if (index === -1) {
      return '' + this.dataContext.seasons[0];
    } else if (index < this.dataContext.seasons.length - 1) {
      return '-1';
    }
    return '';
  }

  plusYear() {
    const index = this.dataContext.seasons.indexOf(this.dataContext.filter.season);
    if (index === -1) {
      return;
    } else if (index === 0) {
      this.dataContext.filter.season = this.ALL_SEASONS;
    } else {
      this.dataContext.filter.season = this.dataContext.seasons[index - 1];
    }
    this.searchBySeason();
  }

  minusYear() {
    const index = this.dataContext.seasons.indexOf(this.dataContext.filter.season);
    if (index === -1) {
      this.dataContext.filter.season = this.dataContext.seasons[0];
    } else if (index < this.dataContext.seasons.length - 1) {
      this.dataContext.filter.season = this.dataContext.seasons[index + 1];
    } else {
      return;
    }
    this.searchBySeason();
  }

  searchByTexts() {
    this.search();
  }

  searchBySpeaker() {
    this.search();
  }

  search() {
    const hasSpeechFilterValues = this.dataContext.filter.speaker || this.dataContext.filter.texts || this.dataContext.filter.label;
    if (hasSpeechFilterValues) {
      this.dataContext.filter.season = this.ALL_SEASONS;
      this.seasonDisabled = true;
    } else if (this.seasonDisabled) {
      this.seasonDisabled = false;
      this.dataContext.filter.season = new Date().getFullYear();
    }

    this.meetings.forEach(m => {
      m.hiddenByFilter = this.isMeetingHidden(m);
      let allSpeechesHidden = true;
      if (m.speeches) {
        m.speeches.forEach(s => {
          s.hiddenByFilter = this.isSpeechHidden(m, s)
          allSpeechesHidden = allSpeechesHidden && s.hiddenByFilter;
        });
      }
      if (hasSpeechFilterValues && allSpeechesHidden) {
        m.hiddenByFilter = true;
      }
    })
  }

  isMeetingHidden(meeting: Meeting): boolean {
    return meeting.season !== this.dataContext.filter.season && this.dataContext.filter.season !== this.ALL_SEASONS;
  }

  isSpeechHidden(meeting: Meeting, speech: Speech): boolean {
    if (meeting.hiddenByFilter) {
      return true;
    }
    return !this.hasTextSpeakers(speech.speakers, this.dataContext.filter.speaker)
      || !this.hasTextTitles(speech, this.dataContext.filter.texts)
      || !this.hasLabel(speech, this.dataContext.filter.label);
  }

  hasLabel(speech: Speech, label: string): boolean {
    return !label || (speech.labels && speech.labels.indexOf(label) > -1);
  }

  hasTextTitles(speech: Speech, pattern: string): boolean {
    return this.hasPattern(speech.titles, pattern) || this.hasPattern(speech.descr, pattern);
  }

  hasTextSpeakers(speakers: Speaker[], pattern: string): boolean {
    return !pattern || speakers.map(s => s.names)
      .some(n => this.hasPattern(n, pattern));
  }

  hasPattern(texts: any, pattern: string): boolean {
    return !pattern || JSON.stringify(texts || {})
      .toLowerCase().indexOf(pattern.toLowerCase()) > -1;
  }
}
