import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataContext } from './data.context';

@Component({
  selector: '[app]',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private dataContext: DataContext,
              private translate: TranslateService,
              private router: Router) {
    this.translate.setDefaultLang(dataContext.config.defaultLang);
    this.translate.currentLang = dataContext.config.defaultLang;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // FIXME
      }
    });
  }

}
