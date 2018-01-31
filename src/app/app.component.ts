import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DataContext} from './data.context';
import {ParamMap} from '@angular/router/src/shared';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private dataContext: DataContext,
              private translate: TranslateService,
              private route: ActivatedRoute) {
    this.translate.setDefaultLang(dataContext.config.defaultLang);
    this.translate.currentLang = dataContext.config.defaultLang;
    this.translate.use(dataContext.config.defaultLang);

    // this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
    //   const langParam = paramMap.get('lang');
    //   const lang = langParam ? langParam : dataContext.config.defaultLang;
    //   this.translate.currentLang = lang;
    //   this.translate.use(lang);
    // });
  }
}
