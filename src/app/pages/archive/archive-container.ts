import {Component} from '@angular/core';
import {ArchiveTabState} from './archive.tab.state';
import {Router} from '@angular/router';
import {DataContext} from '../../data.context';

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
