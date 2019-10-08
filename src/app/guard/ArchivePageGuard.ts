import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {forkJoin} from 'rxjs';
import {Meeting} from '../models/Meeting.model';
import {AppContext} from '../context/AppContext';
import {DataHttpService} from '../services/DataHttpService';
import {ArchiveContext} from '../context/ArchiveContext';
import {TranslationService} from '../translations/TranslationService';
import {LabelItem} from '../models/LabelItem.model';
import {Speaker} from '../models/Speaker.model';
import {Lang} from '../models/Lang.model';
import {SpeakerTabItem} from '../models/SpeakerTabItem.model';
import {Speech} from '../models/Speech.model';
import {MeetingProcessUtil} from '../util/MeetingProcessUtil';

@Injectable()
export class ArchivePageGuard implements CanActivate {
  private initialized = false;

  constructor(private dataHttpService: DataHttpService,
              private translationService: TranslationService,
              private appContext: AppContext,
              private archiveContext: ArchiveContext) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const urls = this.appContext.config.meetingsUrls.archive;
    return this.initialized ? Promise.resolve(true) : forkJoin(urls.map(url => this.dataHttpService.getMeetings(url)))
      .toPromise().then((meetingsMatrix: Array<Array<Meeting>>) => {
        meetingsMatrix.forEach(meetings => meetings.forEach(meeting => this.archiveContext.meetings.push(meeting)));
        this.processData();
        this.initialized = true;
        return true;
      });
  }

  private processData(): void {
    this.archiveContext.meetings.forEach(meeting => this.processMeeting(meeting));
    this.archiveContext.labels.push(...Array.from(this.archiveContext.labelMap.values()).sort((a, b) => b.count - a.count));
  }

  private processMeeting(meeting: Meeting): void {
    MeetingProcessUtil.processMeeting(meeting);
    this.addSeason(meeting);
    if (meeting.speeches) {
      meeting.speeches.forEach(speech => this.processSpeech(speech, meeting.start));
    }
  }

  addSeason(meeting: Meeting): void {
    if (this.archiveContext.seasons.indexOf(meeting.season) < 0) {
      this.archiveContext.seasons.push(meeting.season);
    }
  }

  processSpeech(speech: Speech, meetingDate: Date): void {
    MeetingProcessUtil.processSpeech(speech, this.appContext.config);
    if (speech.top) {
      this.addTop(speech);
    }
    if (speech.labels) {
      this.addLabels(speech);
    }
    if (speech.speakers) {
      speech.speakers.forEach(speaker => {
        const topPlace = speech.top ? speech.top.place : -1;
        this.addSpeaker(speaker, meetingDate, topPlace);
      });
    }
  }

  addTop(speech: Speech): void {
    const speechCopy = JSON.parse(JSON.stringify(speech));
    MeetingProcessUtil.processSpeech(speechCopy, this.appContext.config);
    this.archiveContext.best.push(speechCopy);
  }

  addLabels(speech: Speech): void {
    speech.labels.forEach(label => {
      const labelMap = this.archiveContext.labelMap;
      if (!labelMap.get(label)) {
        labelMap.set(label, new LabelItem(label));
      } else {
        labelMap.get(label).addCount();
      }
    });
  }

  addSpeaker(speaker: Speaker, date: Date, topPlace: number) {
    const lang = this.translationService.lang;
    const speakerName = speaker.names[lang] ? speaker.names[lang] : speaker.names[Lang.DEFAULT];
    let speakerTabItem = this.archiveContext.speakers.get(speakerName);
    if (!speakerTabItem) {
      speakerTabItem = new SpeakerTabItem();
      speakerTabItem.date = date;
      speakerTabItem.names = speaker.names;
      speakerTabItem.titles = speaker.titles;
      speakerTabItem.image = speaker.image;
      speakerTabItem.url = speaker.url;
    }
    if (speakerTabItem.date.getTime() < date.getTime()) {
      speakerTabItem.date = date;
    }
    if (topPlace === 1) {
      speakerTabItem.top1++;
    }
    if (topPlace === 2) {
      speakerTabItem.top2++;
    }
    if (topPlace === 3) {
      speakerTabItem.top3++;
    }
    if (topPlace > 3) {
      speakerTabItem.topOther++;
    }
    speakerTabItem.speechCount++;
    this.archiveContext.speakers.set(speakerName, speakerTabItem);
  }
}
