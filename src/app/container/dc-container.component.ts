import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Lang} from '../models/Lang.model';
import {TranslationService} from '../translations/TranslationService';
import {AppContext} from '../context/AppContext';
import {Member} from '../models/Member.model';

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

  public devclubText;
  public styleColor;
  public blogUrl;
  public devclubMenuText;
  public devclubMenuUrl;
  public teamMembers;

  constructor(private url: LocationStrategy,
              private router: Router,
              private route: ActivatedRoute,
              private translationService: TranslationService,
              appContext: AppContext) {
    this.devclubText = appContext.config.devclubText;
    this.styleColor = appContext.config.baseColor;
    this.blogUrl = appContext.config.resources.main.blog;
    this.devclubMenuText = appContext.config.devclubMenuText;
    this.devclubMenuUrl = appContext.config.devclubMenuUrl;
    this.teamMembers = this.convertToMatrix(appContext.team.team);
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

  convertToMatrix(members: Array<Member>): Array<Array<Member>> {
    let rowMaxLength = 0;
    const loop = [0, 1, 2, 3, 4];
    const sort = (a: Member, b: Member) => a.col - b.col;
    const result = new Array<Member[]>();

    loop.forEach(i => {
      const row = members.filter(m => m.row === i + 1).sort(sort);
      if (rowMaxLength < row.length) {
        rowMaxLength = row.length
      }
      if (row.length > 0) {
        result[i] = row
      }
    });

    const empty = new Member();
    empty.emptyCell = true;
    result.forEach((row: Member[]) => {
      let push = true;
      while (row.length < rowMaxLength) {
        push ? row.push(empty) : row.unshift(empty);
        push = !push;
      }
    });
    return result;
  }
}
