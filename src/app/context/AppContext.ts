import {Injectable} from '@angular/core';
import {Advertising} from '../models/Advertising.model';
import {Team} from '../models/Team.model';
import {Config} from '../models/Config.model';
import {TeamPerson} from '../models/TeamPerson.model';

@Injectable()
export class AppContext {
  public config: Config;
  public advertising: Advertising;
  public team: Team;

  public processData() {
    this.processPhotos(this.config.photoUrlPrefix);
    this.processAdvertisingCompanies(this.config.finances.logoUrlPrefix);
    this.processMembers(this.team.persons, this.config.team.personUrlPrefix);
  }

  private processPhotos(photoUrlPrefix: string): void {
    this.config.photos.forEach(row => row.forEach(photo => {
      photo.mainUrl = photoUrlPrefix + '/' + photo.main;
      photo.smallUrl = photoUrlPrefix + '/' + photo.small;
    }));
  }

  private processAdvertisingCompanies(logoUrlPrefix: string): void {
    this.advertising.companies.forEach(item => item.logoUrl = logoUrlPrefix + '/' + item.logo);
  }

  private processMembers(teamPersons: Map<string, TeamPerson>, personUrlPrefix: string): void {
    this.team.team.forEach(member => {
      member.person = teamPersons[member.personCode];
      member.imageUrl = personUrlPrefix + '/' + member.person.image;
    });
  }
}

