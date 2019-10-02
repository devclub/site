import {Pipe, PipeTransform} from '@angular/core';
import {Lang} from '../models/Lang.model';
import {TranslationService} from './TranslationService';

@Pipe({name: 'localize', pure: false})
export class LocalizePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {
  }

  transform(value: any, defaultValue: any = ''): any {
    if (!value) {
      return defaultValue;
    }
    const v = value[this.translationService.lang];
    if (v) {
      return v;
    }
    if (value[Lang.DEFAULT]) {
      return value[Lang.DEFAULT];
    }

    const isArray = Array.isArray(defaultValue);
    const langs = [Lang.EN, Lang.ET, Lang.RU];
    for (const lang of langs) {
      const currentValue = value[lang];
      if (currentValue && !isArray) {
        return '[' + lang + '] ' + currentValue;
      } else if (currentValue && currentValue.length > 0) {
        return currentValue.map(v => '[' + lang + '] ' + v);
      }
    }

    return defaultValue;
  }
}
