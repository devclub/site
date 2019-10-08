import {Meeting} from '../models/Meeting.model';
import {Speech} from '../models/Speech.model';
import {Config} from '../models/Config.model';

export class MeetingProcessUtil {

  public static processMeetingAndSpeeches(meeting: Meeting, config: Config) {
    this.processMeeting(meeting);
    if (meeting.speeches) {
      meeting.speeches.forEach(speech => this.processSpeech(speech, config));
    }
  }

  public static processMeeting(meeting: Meeting) {
    meeting.start = meeting.datetime ? new Date(meeting.datetime) : null;
  }

  public static processSpeech(speech: Speech, config: Config) {
    speech.labelsAsText = speech.labels ? speech.labels.join(', ') : '';
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
}
