import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {forkJoin} from 'rxjs';
import {DataUtil} from './data.util';
import {Seminar} from '../models/Seminar.model';
import {Meeting} from '../models/Meeting.model';
import {LabelItem} from '../models/LabelItem.model';
import {MeetingFilter} from '../models/MeetingFilter.model';
import {Speech} from '../models/Speech.model';
import {SpeakerTabItem} from '../models/SpeakerTabItem.model';
import {Speaker} from '../models/Speaker.model';
import {Lang} from '../models/Lang.model';
import {Advertising} from '../models/Advertising.model';
import {Member} from '../models/Member.model';
import {Team} from '../models/Team.model';
import {Config} from '../models/Config.model';
import {TeamPerson} from '../models/TeamPerson.model';
import {TranslationService} from '../translations/TranslationService';

@Injectable()
export class DataContext {
  public config: Config;

  public advertising: Advertising;

  public teamMember = new Array<Member[]>();
  public teamPersons: Map<string, TeamPerson>;

  public seminarsLoaded = false;
  public seminars = new Array<Seminar>();

  public meetingsLoaded = false;
  public meetings = new Array<Meeting>();

  public labelMap = new Map<string, LabelItem>();
  public labels = new Array<LabelItem>();

  public filter = new MeetingFilter();
  public seasons = new Array<number>();
  public best = new Array<Speech>();
  public speakers = new Map<String, SpeakerTabItem>();

  constructor(private http: HttpClient, private translationService: TranslationService) {
    this.filter.season = new Date().getFullYear();
  }

  initializeBaseData(advertising: Advertising, team: Team, meetings: Meeting[]): boolean {
    this.setAdvertising(advertising);
    this.setTeam(team);
    this.addMeetings(meetings);
    return true;
  }

  initializeArchive(): Promise<boolean> {
    return this.meetingsLoaded
      ? Promise.resolve(true)
      : forkJoin(
        this.config.meetingsUrls.archive
          .map((url: string) => this.http.get<Meeting[]>(url)))
        .toPromise().then(this.addMeetingLists);
  }

  initializeSeminars(): Promise<boolean> {
    return this.seminarsLoaded
      ? Promise.resolve(true)
      : this.http.get<Seminar[]>(this.config.seminarsUrl).toPromise().then(this.addSeminars);
  }

  setConfig(config: Config) {
    this.config = config;
    DataUtil.processPhotos(this.config.photos, this.config.photoUrlPrefix);
  }

  setAdvertising(advertising: Advertising) {
    this.advertising = advertising;
    DataUtil.processAdvertisingCompanies(
      this.advertising.companies, this.config.finances.logoUrlPrefix);
  }

  setTeam(team: Team) {
    DataUtil.fillMembers(team.persons, team.team, this.config.team.personUrlPrefix);
    this.teamMember = DataUtil.convertToMatrix(team.team);
    this.teamPersons = team.persons;
  }

  addSeminars = (seminars: Seminar[]): boolean => {
    DataUtil.processSeminars(seminars);
    this.seminars.push(...seminars);
    this.seminarsLoaded = true;
    return this.seminarsLoaded;
  };

  addMeetingLists = (meetingLists: Meeting[][]): boolean => {
    meetingLists.forEach((meetings: Meeting[]) => {
      this.addMeetings(meetings);
    });
    this.labels = Array.from(this.labelMap.values())
      .sort((a, b) => b.count - a.count);
    this.meetingsLoaded = true;
    return this.meetingsLoaded;
  };

  addMeetings(meetings: Meeting[]) {
    DataUtil.processMeetings(meetings, this.config, this.teamPersons, this.translationService.lang);
    meetings.forEach(meeting => {
      if (!meeting.hidden) {
        this.meetings.push(meeting);
      }
      if (this.seasons.indexOf(meeting.season) < 0) {
        this.seasons.push(meeting.season);
      }
      if (meeting.speeches) {
        meeting.speeches.forEach(speech => {
          if (speech.top) {
            const speechCopy = JSON.parse(JSON.stringify(speech));
            DataUtil.processSpeech(speechCopy, this.config, this.teamPersons, this.translationService.lang);
            this.best.push(speechCopy);
          }
          if (speech.labels) {
            speech.labels.forEach(label => {
              if (!this.labelMap.get(label)) {
                this.labelMap.set(label, new LabelItem(label));
              } else {
                this.labelMap.get(label).addCount();
              }
            });
          }
          if (speech.speakers) {
            speech.speakers.forEach(speaker => {
              const topPlace = speech.top ? speech.top.place : -1;
              this.addSpeaker(speaker, meeting.start, topPlace);
            });
          }
        });
      }
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

