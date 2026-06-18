import { MeetingProcessUtil } from './MeetingProcessUtil';
import { Meeting } from '../models/Meeting.model';
import { Speech } from '../models/Speech.model';
import { Config } from '../models/Config.model';

function configStub(): Config {
  return {
    personUrlPrefix: 'https://cdn/persons',
    personDefaultImage: 'nophoto.png'
  } as unknown as Config;
}

describe('MeetingProcessUtil', () => {
  describe('processMeeting', () => {
    it('parses datetime into a Date in start', () => {
      const meeting = { datetime: '2026-06-30T19:00:00+03:00' } as Meeting;
      MeetingProcessUtil.processMeeting(meeting);
      expect(meeting.start).toBeInstanceOf(Date);
      expect(meeting.start!.getTime()).toBe(new Date('2026-06-30T19:00:00+03:00').getTime());
    });

    it('sets start to null when datetime is missing', () => {
      const meeting = { datetime: '' } as Meeting;
      MeetingProcessUtil.processMeeting(meeting);
      expect(meeting.start).toBeNull();
    });
  });

  describe('processSpeech', () => {
    it('joins labels into labelsAsText', () => {
      const speech = { labels: ['battle', 'live'] } as Speech;
      MeetingProcessUtil.processSpeech(speech, configStub());
      expect(speech.labelsAsText).toBe('battle, live');
    });

    it('produces empty labelsAsText when there are no labels', () => {
      const speech = {} as Speech;
      MeetingProcessUtil.processSpeech(speech, configStub());
      expect(speech.labelsAsText).toBe('');
    });

    it('builds youtube watch urls and skips empty ids', () => {
      const speech = { youtube: ['abc123', ''] } as Speech;
      MeetingProcessUtil.processSpeech(speech, configStub());
      expect(speech.youtubeUrls).toEqual(['https://www.youtube.com/watch?v=abc123']);
    });

    it('resolves speaker image url from the configured prefix', () => {
      const speech = { speakers: [{ image: 'umut.png' } as any] } as Speech;
      MeetingProcessUtil.processSpeech(speech, configStub());
      expect(speech.speakers[0].imageUrl).toBe('https://cdn/persons/umut.png');
    });

    it('falls back to the default image when a speaker has none', () => {
      const speech = { speakers: [{} as any] } as Speech;
      MeetingProcessUtil.processSpeech(speech, configStub());
      expect(speech.speakers[0].imageUrl).toBe('https://cdn/persons/nophoto.png');
    });
  });

  describe('processMeetingAndSpeeches', () => {
    it('processes the meeting and all of its speeches', () => {
      const meeting = {
        datetime: '2026-06-30T19:00:00+03:00',
        speeches: [{ labels: ['battle'], speakers: [{ image: 'a.png' } as any] } as Speech]
      } as Meeting;
      MeetingProcessUtil.processMeetingAndSpeeches(meeting, configStub());
      expect(meeting.start).toBeInstanceOf(Date);
      expect(meeting.speeches[0].labelsAsText).toBe('battle');
      expect(meeting.speeches[0].speakers[0].imageUrl).toBe('https://cdn/persons/a.png');
    });
  });
});
