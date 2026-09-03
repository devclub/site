import {Component, HostBinding, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '../translations/TranslatePipe';
import { DcAdsRowUpperComponent } from './dc-ads-row-upper.component';
import { DcAdsRowLowerComponent } from './dc-ads-row-lower.component';
import { DcSocialYoutubeBlockComponent } from './dc-social-youtube-block.component';
import { DcTeamRowsComponent } from './dc-team-rows.component';
import { DcRessourcesComponent } from '../components/dc-ressources.component';
import { DcTitleRowComponent } from '../components/dc-title-row.component';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Lang} from '../models/Lang.model';
import {TranslationService} from '../translations/TranslationService';
import {AppContext} from '../context/AppContext';
import {Member} from '../models/Member.model';

@Component({
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, TranslatePipe, DcAdsRowUpperComponent, DcAdsRowLowerComponent, DcSocialYoutubeBlockComponent, DcTeamRowsComponent, DcRessourcesComponent, DcTitleRowComponent],
  templateUrl: './dc-container.component.html'
})
export class DcContainerComponent {
  public langs = [
    {code: Lang.ET, text: 'EST'},
    {code: Lang.EN, text: 'ENG'},
    {code: Lang.RU, text: 'РУС'}
  ];
  public isMenuOpen = false;
  public isScrolled = false;
  public currentYear = new Date().getFullYear();

  public devclubText;
  public blogUrl;
  public devclubMenuText;
  public devclubMenuUrl;
  public teamMembers;

  // Runtime brand seed from the data repo (§4.4). Published as custom
  // properties on the host so the shell (navbar + footer) and hero wash can
  // consume them without per-element [ngStyle] bindings.
  @HostBinding('style.--dc-brand-shell') brandShell;
  @HostBinding('style.--dc-brand-seed') brandSeed;

  constructor(private url: LocationStrategy,
              private router: Router,
              private route: ActivatedRoute,
              private translationService: TranslationService,
              appContext: AppContext) {
    this.devclubText = appContext.config.devclubText;
    this.brandShell = appContext.config.baseColor;
    this.brandSeed = appContext.config.lightColor;
    this.blogUrl = appContext.config.resources.main.blog;
    this.devclubMenuText = appContext.config.devclubMenuText;
    this.devclubMenuUrl = appContext.config.devclubMenuUrl;
    this.teamMembers = this.convertToMatrix(appContext.team.team);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  skipToMain(event: Event) {
    event.preventDefault();
    document.getElementById('main')?.focus();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = (window.scrollY || document.documentElement.scrollTop) > 8;
  }

  navigate(url: string) {
    this.router.navigate([url], {queryParamsHandling: 'merge'});
    this.isMenuOpen = false;
  }

  switchLang(langCode: string) {
    this.router.navigate(['.'], {
      queryParams: {'lang': langCode},
      relativeTo: this.route
    });
    this.isMenuOpen = false;
  }

  isMainUrl() {
    return this.url.path() === '/' || this.url.path().startsWith('/?');
  }

  isCurrentUrl(url: string) {
    return this.router.isActive(url, false);
  }

  isCurrentLang(langCode: string) {
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
