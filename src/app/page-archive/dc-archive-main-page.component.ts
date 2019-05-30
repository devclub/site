import {Component} from '@angular/core';
import {ArchiveTabState} from './services/archive.tab.state';
import {DataContext} from '../common/context/data.context';
import {DataUtil} from '../common/context/data.util';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {Speaker} from '../common/models/speaker.model';
import {Meeting} from '../common/models/meeting.model';
import {TranslationService} from '../common/translations/translation.service';

@Component({
  templateUrl: './dc-archive-main-page.component.html'
})
export class DcArchiveMainPageComponent {
  public readonly ALL_SEASONS = -1;
  public asList = true;
  public seasonTouched = false;
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
    this.search(true);
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
    this.seasonTouched = true;
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

  search(initial = false) {
    // deep copy
    let result = JSON.parse(JSON.stringify(this.dataContext.meetings));
    DataUtil.processMeetings(result,
      this.dataContext.config.personUrlPrefix,
      this.dataContext.config.personDefaultImage);

    if (!initial && !this.seasonTouched) {
      if (this.dataContext.filter.speaker
        || this.dataContext.filter.texts
        || this.dataContext.filter.label) {
        this.dataContext.filter.season = this.ALL_SEASONS;
      } else {
        this.dataContext.filter.season = new Date().getFullYear();
      }
    }

    // search
    result = result.filter(m => {
      const bySeason =
        m.season === this.dataContext.filter.season
        || this.dataContext.filter.season === this.ALL_SEASONS;
      if (bySeason && m.speeches) {
        m.speeches = m.speeches.filter(s => {
          return this.hasTextSpeakers(s.speakers, this.dataContext.filter.speaker)
            && (this.hasPattern(s.titles, this.dataContext.filter.texts)
              || this.hasPattern(s.descr, this.dataContext.filter.texts))
            && (!this.dataContext.filter.label
              || (s.labels && s.labels.indexOf(this.dataContext.filter.label) > -1));
        });
      }
      return bySeason && m.speeches && m.speeches.length > 0;
    });
    this.meetings = result;
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
