import { Component } from '@angular/core';
import {ArchiveTabState} from './services/archive.tab.state';
import {DataContext} from '../context/data.context';

@Component({
  templateUrl: './dc-archive-seminar-page.component.html'
})
export class DcArchiveSeminarPageComponent {
  constructor(private archiveTabState: ArchiveTabState,
              public dataContext: DataContext) {
    archiveTabState.setSeminar();
  }

  trackByIndex(index: number) {
    return index;
  }
}
