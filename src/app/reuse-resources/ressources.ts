import {Component} from '@angular/core';
import {DataResourcesCommon} from './data.resources.common';
import {DataResourcesEu} from './data.resources.eu';
import {DataResourcesEe} from './data.resources.ee';
import {DataResourcesLv} from './data.resources.lv';

@Component({
  selector: 'ressources',
  templateUrl: './ressources.html'
})
export class Ressources {
  public common = new DataResourcesCommon();
  public eu = new DataResourcesEu();
  public ee = new DataResourcesEe();
  public lv = new DataResourcesLv();
}
