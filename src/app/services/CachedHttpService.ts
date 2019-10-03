import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CachedHttpService {
  private CACHE_DATE_PARAM_VALUE = 'CACHED_DATE';
  private CACHE_DATE_AGE_IN_HOURS = 6;

  constructor(private http: HttpClient) {
    this.checkCachedDate();
  }

  checkCachedDate(): void {
    if (typeof (Storage) === 'undefined') {
      return; // no web storage support.
    }

    const cachedDate = localStorage.getItem(this.CACHE_DATE_PARAM_VALUE);
    if (!cachedDate) {
      this.resetCache();
      return; // no cachedDate value
    }

    const cacheExpired = moment().add(this.CACHE_DATE_AGE_IN_HOURS * -1, 'h').isAfter(moment(cachedDate));
    if (cacheExpired) {
      this.resetCache();
    }
  }

  resetCache(): void {
    localStorage.clear();
    localStorage.setItem(this.CACHE_DATE_PARAM_VALUE, new Date().toISOString());
  }

  public get<T>(url: string): Promise<T> {
    const item = localStorage.getItem(url);
    if (item) {
      return Promise.resolve(JSON.parse(item));
    }
    return this.http.get<T>(url).toPromise().then(r => {
      localStorage.setItem(url, JSON.stringify(r));
      return r;
    });
  }
}
