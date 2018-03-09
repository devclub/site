import {Component} from '@angular/core';
import {ArchiveTabState} from './archive.tab.state';
import {faCamera, faInfoCircle, faUser} from '@fortawesome/fontawesome-free-solid';
import {faYoutube} from '@fortawesome/fontawesome-free-brands';
import * as fontawesome from '@fortawesome/fontawesome';
import {Router} from '@angular/router';
import {DataContext} from '../../data.context';

fontawesome.library.add(faYoutube, faCamera, faInfoCircle);
fontawesome.library.add(faUser);

@Component({
  templateUrl: './archive-container.html'
})
export class ArchiveContainerPage {
  constructor(public archiveTabState: ArchiveTabState,
              public dataContext: DataContext,
              private router: Router) {
  }

  navigate(url) {
    this.router.navigate([url], {queryParamsHandling: 'merge'});
  }
}
