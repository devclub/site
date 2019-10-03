import {Component} from '@angular/core';
import {Seminar} from '../models/Seminar.model';
import {ArchiveContext} from '../context/ArchiveContext';

@Component({
  templateUrl: './dc-archive-seminar-page.component.html'
})
export class DcArchiveSeminarPageComponent {
  public seminars = new Array<Seminar>();

  constructor(archiveContext: ArchiveContext) {
    this.seminars = archiveContext.seminars;
  }

  trackByIndex(index: number) {
    return index;
  }
}
