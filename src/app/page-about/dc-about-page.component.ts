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

  constructor(appContext: AppContext, translationService: TranslationService, sanitizer: DomSanitizer) {
    let template = appContext.config.calendarEmbedUrl;
    if (translationService.lang === Lang.RU) {
      template = template.replace('&hl=en&', '&hl=ru&');
    }
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
