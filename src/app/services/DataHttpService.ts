import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Config} from '../models/Config.model';
import {environment} from '../../environments/environment.dev-eu';
import {forkJoin, Observable, of} from 'rxjs';
import {Advertising} from '../models/Advertising.model';
import {Team} from '../models/Team.model';
import {Meeting} from '../models/Meeting.model';
import {Seminar} from '../models/Seminar.model';

@Injectable()
export class DataHttpService {
  constructor(private http: HttpClient) {
  }

  public getInitial(): Promise<[Config, Advertising, Team, Array<Meeting>]> {
    return this.getConfig()
      .then(config => {
        return forkJoin([
          of(config),
          this.getAdvertising(config.finances.dataUrl),
          this.getTeam(config.team.dataUrl),
          this.getMeetings(config.meetingsUrls.main)
        ]).toPromise()
      });
  }

  private getConfig(): Promise<Config> {
    return this.http.get<Config>(environment.config).toPromise();
  }

  private getAdvertising(url: string): Observable<Advertising> {
    return this.http.get<Advertising>(url);
  }

  private getTeam(url: string): Observable<Team> {
    return this.http.get<Team>(url);
  }

  private getMeetings(url: string): Observable<Array<Meeting>> {
    return this.http.get<Array<Meeting>>(url);
  }

  public getSeminars(url: string): Observable<Array<Seminar>> {
    return this.http.get<Array<Seminar>>(url);
  }
}
