import {Injectable} from '@angular/core';
import {Advertising} from '../models/Advertising.model';
import {Team} from '../models/Team.model';
import {Config} from '../models/Config.model';

@Injectable()
export class AppContext {
  public config: Config;
  public advertising: Advertising;
  public team: Team;
}

