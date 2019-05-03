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
  public DataResourcesCommon = DataResourcesCommon;
  public DataResourcesEu = DataResourcesEu;
  public DataResourcesEe = DataResourcesEe;
  public DataResourcesLv = DataResourcesLv;
}
