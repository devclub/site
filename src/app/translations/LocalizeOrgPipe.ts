import {Pipe, PipeTransform} from '@angular/core';
import {AppContext} from '../context/AppContext';
import {TranslationService} from './TranslationService';
import {Lang} from '../models/Lang.model';

@Pipe({name: 'localizeOrg', pure: false})
export class LocalizeOrgPipe implements PipeTransform {

  constructor(private appContext: AppContext,
              private translateService: TranslationService) {
  }

  transform(orgCodes: Array<string>): any {
    if (!orgCodes || orgCodes.length === 0) {
      return '';
    }
    return orgCodes.map(oc => {
      const person = this.appContext.team.persons[oc];
      if (!person || !person.names) {
        return oc;
      }
      let name = person.names[this.translateService.lang];
      if (name) {
        return name;
      }
      name = person.names[Lang.DEFAULT];
      if (name) {
        return name;
      }
      return oc;
    }).join(', ');
  }
}
