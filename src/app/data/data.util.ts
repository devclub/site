import {Photo} from '../page-about/photo.model';
import {Meeting} from '../reuse-meeting-model/meeting.model';
import {Seminar} from '../page-archive/seminar/seminar.model';
import {Speech} from '../reuse-meeting-model/speech.model';
import {Speaker} from '../reuse-meeting-model/speaker.model';
import {AdvertisingCompany} from './models/advertising-company.model';
import {Member} from './models/member.model';

export class DataUtil {
  public static readonly MEETING_DURATION = 4 * 60 * 60 * 1000;
  public static readonly LATEST_MEETINGS_MAX_COUNT = 3;

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

  static processMember(member: Member, personUrlPrefix: string): void {
    member.imageUrl = personUrlPrefix + '/' + member.image;
  }

  static processMembers(members: Member[], personUrlPrefix: string): void {
    members.forEach(m => this.processMember(m, personUrlPrefix));
  }

  static convertToMatrix(members: Member[]): Array<Member[]> {
    let rowMaxLength = 0;
    const loop = [0, 1, 2, 3, 4];
    const sort = (a: Member, b: Member) => a.col - b.col;
    const result = new Array<Member[]>();

    loop.forEach(i => {
      const row = members.filter(m => m.row === i + 1).sort(sort);
      if (rowMaxLength < row.length) {rowMaxLength = row.length};
      if (row.length > 0) {result[i] = row};
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
    const today = new Date().getTime() + this.MEETING_DURATION;
    return meetings.filter(m => today <= m.start.getTime());
  }

  static getLastMeetings(meetings: Meeting[]): Meeting[] {
    let count = 0;
    const today = new Date().getTime() + this.MEETING_DURATION;
    return meetings.filter(m => {
      if (today > m.start.getTime() && count < this.LATEST_MEETINGS_MAX_COUNT) {
        count++;
        return true;
      }
      return false;
    });
  }

  static processSeminars(seminars: Seminar[]) {
    seminars.forEach(seminar => {
      seminar.start = seminar.datetime ? new Date(seminar.datetime) : null;
    });
  }

  static processMeetings(meetings: Meeting[], personUrlPrefix: string, personDefaultImage: string) {
    meetings.forEach(meeting => {
      meeting.start = meeting.datetime ? new Date(meeting.datetime) : null;
      if (meeting.speeches) {
        this._processSpeeches(meeting.speeches, personUrlPrefix, personDefaultImage);
      }
    });
  }

  private static _processSpeeches(speeches: Speech[], personUrlPrefix: string, personDefaultImage: string) {
    speeches.forEach(speech => {
      speech.youtubeUrls = this._getYoutubeUrls(speech.youtube);
      this._processSpeakers(speech.speakers, personUrlPrefix, personDefaultImage);
    });
  }

  private static _getYoutubeUrls(youtube: string[]) {
    if (!youtube) {
      return [];
    }
    const result = []
    youtube.forEach((youtubeId, index) => {
      if (youtubeId) {
        result.push('https://www.youtube.com/watch?v=' + youtubeId);
      }
    });
    return result;
  }

  private static _processSpeakers(speakers: Speaker[], personUrlPrefix: string, personDefaultImage: string) {
    if (!speakers) {
      return;
    }
    speakers.forEach(speaker => {
      speaker.imageUrl = personUrlPrefix + '/' + (speaker.image ? speaker.image : personDefaultImage);
    });
  }
}

