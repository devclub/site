import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Lang} from '../models/Lang.model';
import {TranslationService} from '../translations/TranslationService';
import {Photo} from '../models/Photo.model';
import {Member} from '../models/Member.model';
import {AppContext} from '../context/AppContext';
import {TeamPerson} from '../models/TeamPerson.model';

@Component({
  templateUrl: './dc-about-page.component.html',
  styleUrls: ['./dc-about-page.component.css']
})
export class DcAboutPageComponent {
  public calendarUrl: SafeResourceUrl;
  public logosArchiveUrl: string;
  public photos: Array<Array<Photo>>;
  public teamThanks = new Array<Member>();

  // FIXME - move out into property
  public googlecalendarUrlTemplate = 'https://calendar.google.com/calendar/embed' +
    '?showTitle=0&showNav=0&showDate=0&showPrint=0&showTabs=0&showCalendars=0' +
    '&mode=AGENDA&height=600&wkst=2&hl={langParam}&bgcolor=%23ffffff&color=%23182C57' +
    '&ctz=Europe%2FTallinn&src=fmju94mnjv0a5s70hat38evqm8%40group.calendar.google.com';

  constructor(appContext: AppContext, translationService: TranslationService, sanitizer: DomSanitizer) {
    const langParamValue = translationService.lang === Lang.RU ? 'ru' : 'en';
    const template = this.googlecalendarUrlTemplate.replace('{langParam}', langParamValue);
    this.calendarUrl = sanitizer.bypassSecurityTrustResourceUrl(template);
    this.logosArchiveUrl = appContext.team.logos;
    this.photos = appContext.config.photos;
    this.processPhotos(appContext.config.photoUrlPrefix);
    this.teamThanks = this.getThanksMembers(appContext.team.persons, appContext.team.thanks, appContext.config.team.personUrlPrefix);
  }

  private processPhotos(photoUrlPrefix: string): void {
    this.photos.forEach(row => row.forEach(photo => {
      photo.mainUrl = photoUrlPrefix + '/' + photo.main;
      photo.smallUrl = photoUrlPrefix + '/' + photo.small;
    }));
  }

  private getThanksMembers(teamPersons: Map<string, TeamPerson>, memberCodes: string[], personUrlPrefix: string): Array<Member> {
    const result = new Array<Member>();
    memberCodes.forEach(memberCode => {
      const member = new Member();
      member.person = teamPersons[memberCode];
      member.imageUrl = personUrlPrefix + '/' + member.person.image;
      result.push(member);
    });
    return result;
  }

  trackByIndex(index: number) {
    return index;
  }
}
