import {Component} from '@angular/core';
import {ArchiveTabState} from './archive.tab.state';
import {DataContext} from '../../data.context';
import {Meeting, Speaker} from '../../models';
import {DataUtil} from '../../data.util';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './archive-main.html'
})
export class ArchiveMainPage {
  public readonly ALL_SEASONS = -1;
  public asList = true;
  public seasonTouched = false;
  public meetings: Meeting[] = [];
  public speechOptions = {
    clickNameFn: (speaker: Speaker) => {
      this.dataContext.filter.speaker = speaker.names[this.translate.currentLang];
      this.search();
    },
    clickLabelFn: (label: string) => {
      this.dataContext.filter.label = label;
      this.search();
    }
  };

  constructor(private archiveTabState: ArchiveTabState,
              private translate: TranslateService,
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
