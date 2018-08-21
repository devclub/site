import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Lang} from '../lang.model';

@Pipe({name: 'localize', pure: false})
export class LocalizePipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: any, defaultValue: any = ''): any {
    if (!value) return defaultValue;
    if (value[this.translate.currentLang]) return value[this.translate.currentLang];
    if (value[Lang.DEFAULT]) return value[Lang.DEFAULT];

    const isArray = Array.isArray(defaultValue);
    let langs = [Lang.EN, Lang.ET, Lang.RU];
    for (let langIndex in langs) {
      const lang = langs[langIndex]
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
