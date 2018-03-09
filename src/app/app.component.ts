import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DataContext} from './data.context';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private dataContext: DataContext,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams.subscribe(
      params => {
        let language = params['lang'];
        language = language ? language : dataContext.config.defaultLang;
        this.translate.use(language);
        this.translate.reloadLang(language);
      }
    );
  }
}
