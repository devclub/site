import {Component} from '@angular/core';
import {ArchiveTabState} from './services/archive.tab.state';
import {Router} from '@angular/router';
import {DataContext} from '../context/data.context';

@Component({
  templateUrl: './dc-archive-container.component.html'
})
export class DcArchiveContainerPageComponent {
  constructor(public archiveTabState: ArchiveTabState,
              public dataContext: DataContext,
              private router: Router) {
  }

  navigate(url) {
    this.router.navigate([url], {queryParamsHandling: 'merge'});
  }
}
