import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../models';

@Pipe({name: 'localize'})
export class LocalizePipe implements PipeTransform {

  constructor(private translate: TranslateService) {
  }

  transform(value: any): any {
    if (!value) return value;
    if (value[this.translate.currentLang]) return value[this.translate.currentLang];
    if (value[Lang.DEFAULT]) return value[Lang.DEFAULT];
    return value;
  }
}
