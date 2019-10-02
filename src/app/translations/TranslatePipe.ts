import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from './TranslationService';

@Pipe({name: 'translate', pure: false})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {
  }

  transform(messageCode: any, params?: Object): any {
    let value = this.translationService.get(messageCode);
    if (!value) {
      return messageCode;
    }
    if (params) {
      const keys = Object.keys(params);
      for (const key of keys) {
        value = value.replace('{{' + key + '}}', params[key]);
      }
    }
    return value;
  }
}
