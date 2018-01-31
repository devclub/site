import { Component, Input } from '@angular/core';
import * as fontawesome from '@fortawesome/fontawesome';
import { faYoutube } from '@fortawesome/fontawesome-free-brands';
import {
  faCalendarAlt,
  faCamera,
  faClock,
  faExternalLinkAlt,
  faHome,
  faLocationArrow
} from '@fortawesome/fontawesome-free-solid';
import { DataContext } from '../data.context';
import { Meeting } from '../models';

fontawesome.library.add(faCalendarAlt, faClock);
fontawesome.library.add(faHome, faLocationArrow, faExternalLinkAlt);
fontawesome.library.add(faYoutube, faCamera);

@Component({
  selector: 'meeting-info',
  templateUrl: './meeting-info.html'
})
export class MeetingInfo {
  @Input() public meeting: Meeting;
  @Input() public showRegisterEvent: boolean;

  constructor(public dataContext: DataContext) {
  }
}
