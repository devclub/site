import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Lang} from '../models/lang.model';
import {DataContext} from '../context/data.context';
import {TranslationService} from '../translations/translation.service';

@Component({
  templateUrl: './dc-container.component.html'
})
export class DcContainerComponent {
  public langs = [
    {code: Lang.ET, text: 'EST'},
    {code: Lang.EN, text: 'ENG'},
    {code: Lang.RU, text: 'РУС'}
  ];
  public isMenuOpen = false;
  public currentYear = new Date().getFullYear();
  public styleColor;
  public blogUrl;

  constructor(public dataContext: DataContext,
              public translationService: TranslationService,
              private url: LocationStrategy,
              private router: Router,
              private route: ActivatedRoute) {
    this.styleColor = dataContext.config.baseColor;
    this.blogUrl = dataContext.config.resources.main.blog;
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
    return this.translationService.lang === langCode;
  }
}
