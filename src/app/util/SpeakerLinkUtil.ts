import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {SpeakerLink} from '../models/SpeakerLink.model';

// Fixed, developer-controlled mapping from a speaker link "kind" to an icon already
// registered in app.module.ts. Keeping this map in code (rather than trusting an
// "iconClasses" value from JSON) guarantees <fa-icon> only ever receives one of these
// known-good values, regardless of what a later content edit puts in the data files.
// A real Map is used deliberately instead of a plain object literal: every plain object
// has Object.prototype in its prototype chain, so bracket-notation lookups of keys like
// "constructor", "toString", or "__proto__" resolve truthy to those *inherited* members
// instead of falling through to the default icon. That inherited value then gets cast to
// IconProp and handed to <fa-icon>, which throws during change detection on an object
// that isn't a real icon definition - reproducing the original blank-page bug via a
// different, content-controlled path. A Map has no such inherited-key surface: get()
// only ever returns an own entry or undefined.
const SPEAKER_LINK_ICONS: Map<string, [string, string]> = new Map<string, [string, string]>([
  ['github', ['fab', 'github']],
  ['linkedin', ['fab', 'linkedin']],
  ['medium', ['fab', 'medium']],
  ['website', ['fas', 'external-link-square-alt']]
]);

const DEFAULT_SPEAKER_LINK_ICON: [string, string] = ['fas', 'external-link-square-alt'];

export class SpeakerLinkUtil {

  // Any unrecognized, missing, or non-string kind safely falls back to a generic
  // external-link icon instead of reaching FontAwesome with an unregistered or malformed
  // value (which throws during change detection). The "string" annotation on `kind` is a
  // compile-time hint only: the real value always originates from un-validated JSON, so
  // it is checked with typeof at runtime before calling any string method on it.
  public static resolveIcon(kind: string): IconProp {
    const normalized = typeof kind === 'string' ? kind.trim().toLowerCase() : '';
    const mapped = SPEAKER_LINK_ICONS.get(normalized);
    return (mapped ? mapped : DEFAULT_SPEAKER_LINK_ICON) as IconProp;
  }

  // Accepts unknown rather than SpeakerLink[]: "links" is raw, un-validated JSON content,
  // so a content edit can put any JSON value there despite the Speaker.links type
  // annotation. Absent values (null/undefined) are the ordinary "no links" case and
  // resolve silently to []. Any other non-array value is malformed content - it is never
  // returned as-is, because that would either hide every link behind a false ".length"
  // check (a truthy non-array object) or reach *ngFor directly (throwing during change
  // detection); it is logged and rejected to [] instead. Each remaining array member is
  // then individually validated before it can reach the template.
  public static sanitizeSpeakerLinks(links: unknown): SpeakerLink[] {
    if (links === null || links === undefined) {
      return [];
    }
    if (!Array.isArray(links)) {
      console.warn('Dropping malformed speaker links value (expected an array):', links);
      return [];
    }
    return links.filter(link => SpeakerLinkUtil.isValidSpeakerLink(link));
  }

  private static isValidSpeakerLink(link: unknown): link is SpeakerLink {
    if (!link || typeof link !== 'object') {
      console.warn('Dropping invalid speaker link (expected an object):', link);
      return false;
    }
    const candidate = link as Partial<SpeakerLink>;
    const hasSafeUrl = SpeakerLinkUtil.isSafeUrl(candidate.url);
    const hasLabel = typeof candidate.label === 'string' && candidate.label.trim().length > 0;
    const hasKind = typeof candidate.kind === 'string';
    if (!hasSafeUrl || !hasLabel || !hasKind) {
      console.warn('Dropping invalid speaker link (requires a safe http(s) url, non-empty label, and string kind):', link);
      return false;
    }
    return true;
  }

  // Only http(s) URLs are considered safe to render as an <a href>. Anything else
  // (e.g. "javascript:", "data:", a relative/unparseable value) is rejected rather than
  // reaching the DOM.
  private static isSafeUrl(url: unknown): boolean {
    if (typeof url !== 'string' || url.trim().length === 0) {
      return false;
    }
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }
}
