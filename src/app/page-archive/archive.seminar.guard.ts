import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {DataContext} from '../data/data.context';
import {Injectable} from '@angular/core';

@Injectable()
export class ArchiveSeminarPageGuard implements CanActivate {
  constructor(private dataContext: DataContext) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.dataContext.initializeSeminars();
  }
}
