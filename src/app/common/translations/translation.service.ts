import {Injectable} from '@angular/core';

import * as en from './data/en.json';
import * as ru from './data/ru.json';
import * as et from './data/et.json';
import {Lang} from '../models/lang.model';

@Injectable()
export class TranslationService {
  public lang;
  public translations = new Map<string, any>();

  constructor() {
    this.translations.set(Lang.EN, en);
    this.translations.set(Lang.RU, ru);
    this.translations.set(Lang.ET, et);
  }

  setLang(lang: string) {
    this.lang = lang;
  }

  get(messageCode: string): string {
    return this.translations.get(this.lang).default[messageCode];
  }
}
