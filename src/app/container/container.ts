import {Component} from '@angular/core';
import {DataContext} from '../data/data.context';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Lang} from '../lang.model';

@Component({
  templateUrl: './container.html',
  styleUrls: ['./container.css']
})
export class Container {
  public langs = [
    {code: Lang.ET, text: 'EST'},
    {code: Lang.EN, text: 'ENG'},
    {code: Lang.RU, text: 'РУС'}
  ];
  public isMenuOpen = false;
  public currentYear = new Date().getFullYear();

  constructor(public dataContext: DataContext,
              private translate: TranslateService,
              private url: LocationStrategy,
              private router: Router,
              private route: ActivatedRoute) {
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigate(url) {
    this.router.navigate([url], {queryParamsHandling: 'merge'});
    this.isMenuOpen = false;
  }

  switchLang(langCode) {
    this.router.navigate(['.'], {
      queryParams: {'lang': langCode},
      relativeTo: this.route
    });
    this.isMenuOpen = false;
  }

  isMainUrl() {
    return this.url.path() === '/' || this.url.path().startsWith('/?');
  }

  isCurrentUrl(url) {
    return this.router.isActive(url, false);
  }

  isCurrentLang(langCode) {
    return this.translate.currentLang === langCode;
  }
}
