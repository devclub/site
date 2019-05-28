import {Injectable} from '@angular/core';

@Injectable()
export class ArchiveTabState {
  public selected = 'main';

  isMain(): boolean {
    return this.selected === 'main';
  }

  setMain() {
    this.selected = 'main';
  }

  isBest(): boolean {
    return this.selected === 'best';
  }

  setBest() {
    this.selected = 'best';
  }

  isSpeaker(): boolean {
    return this.selected === 'speaker';
  }

  setSpeaker() {
    this.selected = 'speaker';
  }

  isSeminar(): boolean {
    return this.selected === 'seminar';
  }

  setSeminar() {
    this.selected = 'seminar';
  }
}

