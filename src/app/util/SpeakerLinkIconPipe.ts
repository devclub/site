import {Pipe, PipeTransform} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {SpeakerLinkUtil} from './SpeakerLinkUtil';

@Pipe({name: 'speakerLinkIcon'})
export class SpeakerLinkIconPipe implements PipeTransform {
  transform(kind: string): IconProp {
    return SpeakerLinkUtil.resolveIcon(kind);
  }
}
