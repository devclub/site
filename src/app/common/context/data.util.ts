import {Photo} from '../../page-about/models/photo.model';
import {Meeting} from '../models/meeting.model';
import {Seminar} from '../../page-archive/models/seminar.model';
import {Speech} from '../models/speech.model';
import {Speaker} from '../models/speaker.model';
import {AdvertisingCompany} from '../models/advertising-company.model';
import {Member} from '../models/member.model';
import {Config} from '../models/config.model';
import {TeamPerson} from '../models/team-person.model';

export class DataUtil {
  public static readonly MEETING_DURATION_IN_MS = 4 * 60 * 60 * 1000;

  static processPhotos(photos: Photo[][], photoUrlPrefix: string): void {
    photos.forEach(
      row => row.forEach(
        photo => {
          photo.mainUrl = photoUrlPrefix + '/' + photo.main;
          photo.smallUrl = photoUrlPrefix + '/' + photo.small;
        }));
  }

  static processAdvertisingCompanies(companies: AdvertisingCompany[], logoUrlPrefix: string): void {
    companies.forEach(item => {
      item.logoUrl = logoUrlPrefix + '/' + item.logo;
    });
  }

  static getMember(teamPerson: TeamPerson, personUrlPrefix: string): Member {
    const result = new Member();
    result.person = teamPerson;
    result.imageUrl = personUrlPrefix + '/' + teamPerson.image;
    return result;
  }

  static getMembers(teamPersons: Map<string, TeamPerson>,  memberCodes: string[], personUrlPrefix: string): Array<Member> {
    const result = new Array<Member>();
    memberCodes.forEach(memberCode => {
      result.push(this.getMember(teamPersons[memberCode], personUrlPrefix));
    });
    return result;
  }

  static fillMembers(teamPersons: Map<string, TeamPerson>, members: Array<Member>, personUrlPrefix: string): void {
    members.forEach(member => {
      member.person = teamPersons[member.personCode];
      member.imageUrl = personUrlPrefix + '/' + member.person.image;
    });
  }

  static convertToMatrix(members: Member[]): Array<Member[]> {
    let rowMaxLength = 0;
    const loop = [0, 1, 2, 3, 4];
    const sort = (a: Member, b: Member) => a.col - b.col;
    const result = new Array<Member[]>();

    loop.forEach(i => {
      const row = members.filter(m => m.row === i + 1).sort(sort);
      if (rowMaxLength < row.length) {
        rowMaxLength = row.length
      }
      if (row.length > 0) {
        result[i] = row
      }
    });

    const empty = new Member();
    empty.emptyCell = true;
    result.forEach((row: Member[]) => {
      let push = true;
      while (row.length < rowMaxLength) {
        push ? row.push(empty) : row.unshift(empty);
        push = !push;
      }
    });
    return result;
  }

  static getNextMeetings(meetings: Meeting[]): Meeting[] {
    const now = new Date().getTime();
    return meetings.filter(m => now <= m.start.getTime() + this.MEETING_DURATION_IN_MS);
  }

  static processSeminars(seminars: Seminar[]) {
    seminars.forEach(seminar => {
      seminar.start = seminar.datetime ? new Date(seminar.datetime) : null;
    });
  }

  static processMeetings(meetings: Meeting[], config: Config, persons: Map<string, TeamPerson>, lang: string) {
    meetings.forEach(meeting => {
      meeting.start = meeting.datetime ? new Date(meeting.datetime) : null;
      if (meeting.org) {
        meeting.orgMod = this.joinOrgsAsText(meeting.org.mod, persons, lang);
        meeting.orgPhoto = this.joinOrgsAsText(meeting.org.photo, persons, lang);
      }
      if (meeting.speeches) {
        this._processSpeeches(meeting.speeches, config, persons, lang);
      }
    });
  }

  private static _processSpeeches(speeches: Speech[], config: Config, persons: Map<string, TeamPerson>, lang: string) {
    speeches.forEach(speech => this.processSpeech(speech, config, persons, lang));
  }

  public static processSpeech(speech: Speech, config: Config, persons: Map<string, TeamPerson>, lang: string) {
    speech.youtubeUrls = this._getYoutubeUrls(speech.youtube);
    speech.labelsAsText = speech.labels ? speech.labels.join(', ') : '';
    if (speech.org) {
      speech.orgCam = this.joinOrgsAsText(speech.org.cam, persons, lang);
      speech.orgEdit = this.joinOrgsAsText(speech.org.edit, persons, lang);
    }
    this._processSpeakers(speech.speakers, config);
  }

  private static _getYoutubeUrls(youtube: string[]) {
    if (!youtube) {
      return [];
    }
    const result = [];
    youtube.forEach((youtubeId, index) => {
      if (youtubeId) {
        result.push('https://www.youtube.com/watch?v=' + youtubeId);
      }
    });
    return result;
  }

  private static _processSpeakers(speakers: Speaker[], config: Config) {
    if (!speakers) {
      return;
    }
    speakers.forEach(speaker => {
      speaker.imageUrl = config.personUrlPrefix + '/' + (speaker.image ? speaker.image : config.personDefaultImage);
    });
  }

  public static joinOrgsAsText(orgs: string[], persons: Map<string, TeamPerson>, lang: string): string {
    const result = [];
    if (orgs && orgs.length > 0) {
      for (const org of orgs) {
        const person = persons[org];
        const name = person ? person.names[lang] : org;
        result.push(name);
      }
    }
    return result.join(', ');
  }
}
