import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppContext} from '../context/AppContext';

@Component({
  templateUrl: './dc-archive-container.component.html'
})
export class DcArchiveContainerPageComponent {
  public tabToUrl = new Map<string, string>();
  public hasBestTab = false;
  public selected;

  constructor(private router: Router, appContext: AppContext) {
    this.hasBestTab = appContext.config.hasTop;

    this.tabToUrl.set('main', '/archive');
    this.tabToUrl.set('seminar', '/archive/seminar');
    this.tabToUrl.set('best', '/archive/best');
    this.tabToUrl.set('speaker', '/archive/speaker');

    this.tabToUrl.forEach((v, k) => {
      if (v === router.url) {
        this.selected = k;
      }
    });
  }

  navigate(tab: string) {
    this.selected = tab;
    this.router.navigate([this.tabToUrl.get(tab)], {queryParamsHandling: 'merge'});
  }
}
