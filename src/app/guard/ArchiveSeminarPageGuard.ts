import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AppContext} from '../context/AppContext';
import {DataHttpService} from '../services/DataHttpService';
import {ArchiveContext} from '../context/ArchiveContext';
import {Seminar} from '../models/Seminar.model';
import {firstValueFrom, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ArchiveSeminarPageGuard implements CanActivate {
  private initialized = false;

  constructor(private dataHttpService: DataHttpService, private appContext: AppContext, private archiveContext: ArchiveContext) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.initialized) {
      return Promise.resolve(true);
    }
    return firstValueFrom(this.dataHttpService.getSeminars(this.appContext.config.seminarsUrl).pipe(
      catchError(error => {
        console.error('Failed to load seminars from ' + this.appContext.config.seminarsUrl, error);
        return of([] as Array<Seminar>);
      })
    )).then(seminars => {
        seminars.forEach(seminar => this.processSeminar(seminar));
        this.initialized = true;
        return true;
      });
  }

  private processSeminar(seminar: Seminar) {
    seminar.start = seminar.datetime ? new Date(seminar.datetime) : null;
    this.archiveContext.seminars.push(seminar);
  }
}
