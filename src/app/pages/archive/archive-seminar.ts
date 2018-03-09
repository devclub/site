import { Component } from '@angular/core';
import {ArchiveTabState} from './archive.tab.state';
import {DataContext} from '../../data.context';

@Component({
  templateUrl: './archive-seminar.html'
})
export class ArchiveSeminarPage {
  constructor(private archiveTabState: ArchiveTabState,
              public dataContext: DataContext) {
    archiveTabState.setSeminar();
  }
}
