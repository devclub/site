import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from './translation.service';

@Pipe({name: 'translate', pure: false})
export class TranslatePipe implements PipeTransform {

  constructor(private translationService: TranslationService) {
  }

  transform(messageCode: any): any {
    const value = this.translationService.get(messageCode);
    if (value) {
      return value;
    }
    return messageCode;
  }
}
