import {Component} from '@angular/core';
import {Speaker} from '../models/Speaker.model';
import {Meeting} from '../models/Meeting.model';
import {TranslationService} from '../translations/TranslationService';
import {Speech} from '../models/Speech.model';
import {MeetingFilter} from '../models/MeetingFilter.model';
import {LabelItem} from '../models/LabelItem.model';
import {ArchiveContext} from '../context/ArchiveContext';
import {Lang} from '../models/Lang.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';

@Component({
  templateUrl: './dc-archive-main-page.component.html'
})
export class DcArchiveMainPageComponent {
  public readonly ALL_SEASONS = -1;

  public seasonDisabled = false;
  public asList = true;
  public filter: MeetingFilter;
  public labels: Array<LabelItem>;
  public seasons: Array<number>;

  public meetings: Array<Meeting>;
  public speechOptions = {
    clickNameFn: (speaker: Speaker) => {
      this.filter.speaker = speaker.names[this.translationService.lang];
      if (!this.filter.speaker) {
        this.filter.speaker = speaker.names[Lang.DEFAULT];
      }
      this.search();
    },
    clickLabelFn: (label: string) => {
      this.filter.label = label;
      this.search();
    }
  };

  constructor(private translationService: TranslationService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              archiveContext: ArchiveContext) {
    this.filter = archiveContext.filter;
    this.seasons = archiveContext.seasons;
    this.labels = archiveContext.labels;
    this.meetings = archiveContext.meetings;
    this.initSearchFilter();
    this.search();
  }

  trackById(index: number, item: Meeting) {
    return item.num + '::' + this.asList;
  }

  changeView(asList: boolean) {
    this.asList = asList;
    this.applyFilterToRoute();
  }

  searchByLabel(event: TypeaheadMatch) {
    this.filter.label = event.item.name;
    this.search();
  }

  searchByLabelClear() {
    if (!this.filter.label) {
      this.search();
    }
  }

  searchBySeason() {
    this.search();
  }

  getPlusYearText(): string {
    const index = this.seasons.indexOf(this.filter.season);
    if (index === 0) {
      return 'archive.main.filter.seasons.all';
    } else if (index !== -1) {
      return '+1';
    }
    return '';
  }

  getMinusYearText(): string {
    const index = this.seasons.indexOf(this.filter.season);
    if (index === -1) {
      return '' + this.seasons[0];
    } else if (index < this.seasons.length - 1) {
      return '-1';
    }
    return '';
  }

  plusYear() {
    const index = this.seasons.indexOf(this.filter.season);
    if (index === -1) {
      return;
    } else if (index === 0) {
      this.filter.season = this.ALL_SEASONS;
    } else {
      this.filter.season = this.seasons[index - 1];
    }
    this.searchBySeason();
  }

  minusYear() {
    const index = this.seasons.indexOf(this.filter.season);
    if (index === -1) {
      this.filter.season = this.seasons[0];
    } else if (index < this.seasons.length - 1) {
      this.filter.season = this.seasons[index + 1];
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

  initSearchFilter(): void {
    const params = this.activatedRoute.snapshot.params;
    this.filter.season = params.season ? params.season * 1 : new Date().getFullYear();
    this.asList = params.asList ? params.asList === 'true' : true;
    if (params.label) {
      this.filter.label = params.label;
    }
    if (params.speaker) {
      this.filter.speaker = params.speaker;
    }
    if (params.descr) {
      this.filter.texts = params.descr;
    }
  }

  search() {
    const hasSpeechFilterValues = this.filter.speaker || this.filter.texts || this.filter.label;
    if (hasSpeechFilterValues) {
      this.filter.season = this.ALL_SEASONS;
      this.seasonDisabled = true;
    } else if (this.seasonDisabled) {
      this.seasonDisabled = false;
      this.filter.season = new Date().getFullYear();
    }

    this.applyFilterToRoute();
    this.meetings.forEach(m => {
      m.hiddenByFilter = this.isMeetingHidden(m);
      let allSpeechesHidden = true;
      if (m.speeches) {
        m.speeches.forEach(s => {
          s.hiddenByFilter = m.hiddenByFilter || hasSpeechFilterValues && this.isSpeechHidden(s)
          allSpeechesHidden = allSpeechesHidden && s.hiddenByFilter;
        });
      }
      if (hasSpeechFilterValues && allSpeechesHidden) {
        m.hiddenByFilter = true;
      }
    })
  }

  private applyFilterToRoute(): void {
    const urlFilter: any = {};
    urlFilter.season = this.filter.season;
    urlFilter.asList = this.asList;
    if (this.filter.label) {
      urlFilter.label = this.filter.label;
    }
    if (this.filter.speaker) {
      urlFilter.speaker = this.filter.speaker;
    }
    if (this.filter.texts) {
      urlFilter.descr = this.filter.texts;
    }
    this.router.navigate(
      [urlFilter],
      {
        relativeTo: this.activatedRoute,
        replaceUrl: true
      }
    );
    document.title = `DEVCLUB MTÜ (archive): season ${this.filter.season}`;
  }

  isMeetingHidden(meeting: Meeting): boolean {
    return meeting.season !== this.filter.season && this.filter.season !== this.ALL_SEASONS;
  }

  isSpeechHidden(speech: Speech): boolean {
    return !this.hasTextSpeakers(speech.speakers, this.filter.speaker)
      || !this.hasTextTitles(speech, this.filter.texts)
      || !this.hasLabel(speech, this.filter.label);
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
