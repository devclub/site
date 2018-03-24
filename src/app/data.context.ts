import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment.dev-eu';
import {
  Advertising,
  AdvertisingCompany,
  Config,
  Lang,
  Meeting,
  MeetingFilter,
  Member,
  MemberComplex,
  Seminar,
  Speaker,
  SpeakerTabItem,
  Speech
} from './models';

@Injectable()
export class DataContext {
  public readonly MEETING_DURATION = 4 * 60 * 60 * 1000;
  public config: Config;

  public advertising: Advertising;

  public teamMember = new Array<Member[]>();
  public teamThanks = new Array<Member[]>();

  public seminarsLoaded = false;
  public seminars = new Array<Seminar>();

  public meetingsLoaded = false;
  public meetings = new Array<Meeting>();

  public nextMeetings = new Array<Meeting>();
  public lastMeetings = new Array<Meeting>();

  public filter = new MeetingFilter();
  public seasons = new Array<number>();
  public best = new Array<Speech>();
  public speakers = new Map<String, SpeakerTabItem>();

  constructor(private http: HttpClient) {
    this.filter.season = new Date().getFullYear();
  }

  initialize() {
    return this.http.get<Config>(environment.config)
      .toPromise()
      .then((config: Config) => {
        this.setConfig(config);
        return Observable.forkJoin([
          this.http.get<AdvertisingCompany[]>(this.config.commercial.dataUrl),
          this.http.get<MemberComplex>(this.config.team.dataUrl),
          this.http.get<Meeting[]>(this.config.meetingsUrls.main)
        ]).toPromise()
          .then((results: any[]) => {
            this.setCommercial(results[0]);
            this.setMembers(results[1]);
            this.addMeetings(results[2]);
            this.setNextMeetings();
            this.setLastMeetings();
          });
      });
  }

  initializeArchive(): Promise<boolean> {
    if (this.meetingsLoaded) {
      return Promise.resolve(true);
    }
    return Observable.forkJoin(
      this.config.meetingsUrls.archive
        .map((url: string) => this.http.get<Meeting[]>(url)))
      .toPromise()
      .then(results => {
        results.forEach((meetings: Meeting[]) => {
          this.addMeetings(meetings);
        });
        this.meetingsLoaded = true;
        return true;
      });
  }

  initializeSeminars(): Promise<boolean> {
    if (this.seminarsLoaded) {
      return Promise.resolve(true);
    }
    return this.http.get<Seminar[]>(this.config.seminarsUrl)
      .toPromise()
      .then(seminars => {
        this.addSeminars(seminars);
        this.seminarsLoaded = true;
        return true;
      });
  }

  setConfig(config: Config) {
    this.config = config;
    this.config.photos.forEach(
      row => row.forEach(
        photo => {
          photo.main = this.config.photoUrlPrefix + '/' + photo.main;
          photo.small = this.config.photoUrlPrefix + '/' + photo.small;
        }));
  }

  setCommercial(advertising: Advertising) {
    this.advertising = advertising;
    this.advertising.companies.forEach(item => {
      item.logo = this.config.commercial.logoUrlPrefix + '/' + item.logo;
    });
  }

  setMembers(memberComplex: MemberComplex) {
    const imageChange = member => member.image = this.config.team.personUrlPrefix + '/' + member.image;
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

  setNextMeetings() {
    const today = new Date().getTime() + this.MEETING_DURATION;
    this.nextMeetings = this.meetings.filter(m => today <= m.start.getTime());
  }

  setLastMeetings() {
    const maxCount = 3;
    let count = 0;
    const today = new Date().getTime() + this.MEETING_DURATION;
    this.lastMeetings = this.meetings.filter(m => {
      if (today > m.start.getTime() && count < maxCount) {
        count++;
        return true;
      }
      return false;
    });
  }

  addSeminars(seminars: Seminar[]) {
    this.processSeminars(seminars);
    this.seminars.push(...seminars);
  }

  processSeminars(seminars: Seminar[]) {
    seminars.forEach(seminar => {
      seminar.start = seminar.datetime ? new Date(seminar.datetime) : null;
    });
  }

  addMeetings(meetings: Meeting[]) {
    this.processMeetings(meetings);
    meetings.forEach(m => {
      if (!m.hidden) {
        this.meetings.push(m);
      }
    });
  }

  processMeetings(meetings: Meeting[]) {
    meetings.forEach(meeting => {
      if (this.seasons.indexOf(meeting.season) < 0) {
        this.seasons.push(meeting.season);
      }
      meeting.start = meeting.datetime ? new Date(meeting.datetime) : null;
      if (meeting.speeches) {
        this.processSpeeches(meeting.speeches, meeting.start);
      }
    });
  }

  processSpeeches(speeches: Speech[], date: Date) {
    speeches.forEach(speech => {
      this.addBest(speech);
      if (speech.speakers) {
        this.processSpeakers(speech.speakers, date, speech.top ? speech.top.place : -1);
      }
      if (speech.youtube) {
        speech.youtube.forEach((youtubeId, index) => {
          if (youtubeId) {
            speech.youtube[index] = 'https://www.youtube.com/watch?v=' + youtubeId;
          }
        });
      }
    });
  }

  addBest(speech: Speech) {
    if (speech.top) {
      this.best.push(speech);
    }
  }

  processSpeakers(speakers: Speaker[], date: Date, topPlace: number) {
    speakers.forEach(speaker => {
      speaker.image = this.config.personUrlPrefix + '/' + (speaker.image ? speaker.image : this.config.personDefaultImage);
      this.addSpeaker(speaker, date, topPlace);
    });
  }

  addSpeaker(speaker: Speaker, date: Date, topPlace: number) {
    const lang = this.config.defaultLang;
    const key = speaker.names[lang] ? speaker.names[lang] : speaker.names[Lang.DEFAULT];
    let s = this.speakers.get(key);
    if (!s) {
      s = new SpeakerTabItem();
      s.date = date;
      s.names = speaker.names;
      s.titles = speaker.titles;
      s.image = speaker.image;
      s.url = speaker.url;
    }
    if (s.date.getTime() < date.getTime()) {
      s.date = date;
    }
    if (topPlace === 1) {
      s.top1++;
    }
    if (topPlace === 2) {
      s.top2++;
    }
    if (topPlace === 3) {
      s.top3++;
    }
    if (topPlace > 3) {
      s.topOther++;
    }
    s.speechCount++;
    this.speakers.set(key, s);
  }
}

