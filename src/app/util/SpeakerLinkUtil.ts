import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {SpeakerLink} from '../models/SpeakerLink.model';

// Fixed, developer-controlled mapping from a speaker link "kind" to an icon already
// registered in app.module.ts. Keeping this map in code (rather than trusting an
// "iconClasses" value from JSON) guarantees <fa-icon> only ever receives one of these
// known-good values, regardless of what a later content edit puts in the data files.
// Typed as plain [string, string] tuples (not IconProp) and cast only at the single
// resolveIcon() return point - combining IconProp's own union with an index-signature
// lookup here overflows the TS2590 "union type too complex" limit.
const SPEAKER_LINK_ICONS: { [kind: string]: [string, string] } = {
  github: ['fab', 'github'],
  linkedin: ['fab', 'linkedin'],
  medium: ['fab', 'medium'],
  website: ['fas', 'external-link-square-alt']
};

const DEFAULT_SPEAKER_LINK_ICON: [string, string] = ['fas', 'external-link-square-alt'];

export class SpeakerLinkUtil {

  // Any unrecognized or missing kind safely falls back to a generic external-link icon
  // instead of reaching FontAwesome with an unregistered or malformed value (which throws
  // during change detection).
  public static resolveIcon(kind: string): IconProp {
    const normalized = kind ? kind.trim().toLowerCase() : '';
    const mapped = SPEAKER_LINK_ICONS[normalized];
    return (mapped ? mapped : DEFAULT_SPEAKER_LINK_ICON) as IconProp;
  }

  // Drops entries that can't be rendered as a reachable, accessible link (missing url
  // and/or label), logging each rejection. An unrecognized "kind" is not rejected here:
  // resolveIcon() already guarantees a safe fallback icon, and the link remains reachable.
  public static sanitizeSpeakerLinks(links: SpeakerLink[]): SpeakerLink[] {
    if (!Array.isArray(links)) {
      return links;
    }
    return links.filter(link => SpeakerLinkUtil.isValidSpeakerLink(link));
  }

  private static isValidSpeakerLink(link: SpeakerLink): boolean {
    const hasUrl = !!link && typeof link.url === 'string' && link.url.trim().length > 0;
    const hasLabel = !!link && typeof link.label === 'string' && link.label.trim().length > 0;
    if (!hasUrl || !hasLabel) {
      console.warn('Dropping invalid speaker link (requires non-empty url and label):', link);
      return false;
    }
    return true;
  }
}
