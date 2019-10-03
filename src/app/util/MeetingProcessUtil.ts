import {Meeting} from '../models/Meeting.model';
import {Speech} from '../models/Speech.model';
import {Config} from '../models/Config.model';
import {TeamPerson} from '../models/TeamPerson.model';

export class MeetingProcessUtil {

  public static processMeetingAndSpeeches(meeting: Meeting, persons: Map<string, TeamPerson>, lang: string, config: Config) {
    this.processMeeting(meeting, persons, lang);
    if (meeting.speeches) {
      meeting.speeches.forEach(speech => this.processSpeech(speech, config, persons, lang));
    }
  }

  public static processMeeting(meeting: Meeting, persons: Map<string, TeamPerson>, lang: string) {
    meeting.start = meeting.datetime ? new Date(meeting.datetime) : null;
    if (meeting.org) {
      meeting.orgMod = this.joinOrgsAsText(meeting.org.mod, persons, lang);
      meeting.orgPhoto = this.joinOrgsAsText(meeting.org.photo, persons, lang);
    }
  }

  public static processSpeech(speech: Speech, config: Config, persons: Map<string, TeamPerson>, lang: string) {
    speech.labelsAsText = speech.labels ? speech.labels.join(', ') : '';
    if (speech.org) {
      speech.orgCam = this.joinOrgsAsText(speech.org.cam, persons, lang);
      speech.orgEdit = this.joinOrgsAsText(speech.org.edit, persons, lang);
    }
    if (speech.youtube) {
      speech.youtubeUrls = new Array<string>();
      speech.youtube.forEach((youtubeId) => {
        if (youtubeId) {
          speech.youtubeUrls.push('https://www.youtube.com/watch?v=' + youtubeId);
        }
      });
    }
    if (speech.speakers) {
      speech.speakers.forEach(speaker => {
        speaker.imageUrl = config.personUrlPrefix + '/' + (speaker.image ? speaker.image : config.personDefaultImage);
      });
    }
  }

  private static joinOrgsAsText(orgs: string[], persons: Map<string, TeamPerson>, lang: string): string {
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
