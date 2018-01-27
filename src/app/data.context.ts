import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment.dev-eu';
import { Config, Meeting, Member, MemberComplex, Sponsor } from './models';

@Injectable()
export class DataContext {
  public config: Config;

  public sponsors: Sponsor[];
  public teamMember: Array<Member[]> = [];
  public teamThanks: Array<Member[]> = [];
  public meetings: Meeting[];

  constructor(private http: HttpClient) {
  }

  initialize() {
    return this.http.get<Config>(environment.config)
      .toPromise()
      .then((config: Config) => {
        this.config = config;
        return Observable.forkJoin([
          this.http.get<Sponsor[]>(this.config.sponsors.dataUrl),
          this.http.get<MemberComplex>(this.config.team.dataUrl),
          this.http.get<Meeting[]>(this.config.meetingsUrls.main)
        ]).toPromise()
          .then((results: any[]) => {
            this.setSponsors(results[0]);
            this.setMembers(results[1]);
            this.setMeetings(results[2]);
          });
      });
  }

  initializeArchive() {
    return Observable.forkJoin(
      this.config.meetingsUrls.archive
        .map((url: string) => this.http.get<Meeting[]>(url)))
      .subscribe(results => {
        results.forEach((meetings: Meeting[]) => {
          this.meetings.push(...meetings);
        });
        return Observable.of(true);
      });
  }

  setSponsors(sponsors: Sponsor[]) {
    this.sponsors = sponsors;
    this.sponsors.forEach(sponsor => {
      sponsor.logo = this.config.sponsors.logoUrlPrefix + '/' + sponsor.logo;
    });
  }

  setMembers(memberComplex: MemberComplex) {
    const imageChange = member => member.image = this.config.team.photoUrlPrefix + '/' + member.image;
    memberComplex.team.forEach(imageChange);
    memberComplex.thanks.forEach(imageChange);

    this.fillMemberList(this.teamMember, memberComplex.team);
    this.fillMemberList(this.teamThanks, memberComplex.thanks);
  }

  fillMemberList(matrix: Array<Member[]>, data: Member[]) {
    let rowMaxLength = 0;
    const loop = [0, 1, 2, 3, 4];
    const sort = (a: Member, b: Member) => a.col - b.col;

    loop.forEach(i => {
      const row = data.filter(m => m.row === i + 1).sort(sort);
      if (rowMaxLength < row.length) rowMaxLength = row.length;
      if (row.length > 0) matrix[i] = row;
    });

    const empty = new Member();
    empty.emptyCell = true;
    matrix.forEach((row: Member[]) => {
      let push = true;
      while (row.length < rowMaxLength) {
        push ? row.push(empty) : row.unshift(empty);
        push = !push;
      }
    });
  }

  setMeetings(meetings: Meeting[]) {
    this.meetings = meetings;
    this.meetings.forEach(meeting => {
      meeting.start = new Date(meeting.datetime);
      meeting.speeches.forEach(speech => {
        speech.speakers.forEach(speaker => {
          speaker.image = this.config.photoUrlPrefix + '/' + (speaker.image ? speaker.image : this.config.photoDefaultImage);
        });
        speech.youtube.forEach((youtubeId, index) => {
          if (youtubeId) {
            speech.youtube[index] = 'https://www.youtube.com/watch?v=' + youtubeId;
          }
        });
      });
    });
  }
}

