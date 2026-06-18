import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../translations/TranslatePipe';
import { DcTitleRowComponent } from '../components/dc-title-row.component';
import {Advertising} from '../models/Advertising.model';
import {AppContext} from '../context/AppContext';

@Component({
  imports: [CommonModule, TranslatePipe, DcTitleRowComponent],
  templateUrl: './dc-advertising-page.component.html'
})
export class DcAdvertisingPageComponent {
  public mail;
  public advertising: Advertising;

  constructor(appContext: AppContext) {
    this.mail = appContext.config.resources.main.mail;
    this.advertising = appContext.advertising;
  }

  trackByIndex(index: number) {
    return index;
  }
}
