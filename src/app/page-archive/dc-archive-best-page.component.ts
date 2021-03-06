import {Component} from '@angular/core';
import {BestGroupBy} from '../models/BestGroupBy.model';
import {Speech} from '../models/Speech.model';
import {MeetingFilter} from '../models/MeetingFilter.model';
import {ArchiveContext} from '../context/ArchiveContext';

@Component({
  templateUrl: './dc-archive-best-page.component.html'
})
export class DcArchiveBestPageComponent {
  public groupNumbers: number[] = [];
  public groups: Map<number, Speech[]> = new Map();
  public filter: MeetingFilter;
  public best;

  constructor(archiveContext: ArchiveContext) {
    this.filter = archiveContext.filter;
    this.best = archiveContext.best;
    this.setGroupState();
  }

  groupBySeason(): void {
    this.groupBy(BestGroupBy.SEASON);
  }

  groupByPlace(): void {
    this.groupBy(BestGroupBy.PLACE);
  }

  private groupBy(groupByType: string): void {
    this.filter.bestGroupBy = groupByType;
    this.setGroupState();
  }

  isGroupByPlace(): boolean {
    return this.filter.bestGroupBy === BestGroupBy.PLACE;
  }

  isGroupBySeason(): boolean {
    return this.filter.bestGroupBy === BestGroupBy.SEASON;
  }

  getGroupHeader(groupNumber: number) {
    return this.isGroupByPlace() ? '#' + groupNumber : groupNumber;
  }

  getRowNumber(speech: Speech) {
    return this.isGroupBySeason() ? '#' + speech.top.place : speech.top.season;
  }

  setGroupState(): void {
    this.groups.clear();
    this.best.forEach((speech) => {
      const groupNumber = this.isGroupByPlace() ? speech.top.place : speech.top.season;
      let speeches = this.groups.get(groupNumber);
      speeches = speeches ? speeches : [];
      speeches.push(speech);
      this.groups.set(groupNumber, speeches);
    });

    this.groups.forEach((speeches, groupNumber) => {
      speeches.sort((s1, s2) => {
        if (this.isGroupBySeason()) {
          return s1.top.place > s2.top.place ? 1 : -1;
        }
        return s1.top.season > s2.top.season ? -1 : 1;
      });
    });

    this.groupNumbers = Array.from(this.groups.keys()).sort();
    if (this.isGroupBySeason()) {
      this.groupNumbers = this.groupNumbers.reverse();
    }
  }
}
