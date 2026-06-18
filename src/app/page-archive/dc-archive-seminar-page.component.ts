import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '../translations/TranslatePipe';
import { LocalizePipe } from '../translations/LocalizePipe';
import {Seminar} from '../models/Seminar.model';
import {ArchiveContext} from '../context/ArchiveContext';

@Component({
  imports: [CommonModule, FontAwesomeModule, TranslatePipe, LocalizePipe],
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
