export class SpeakerLink {
  url: string;
  label: string;
  // Raw, untrusted content from JSON (e.g. "github", "linkedin", "medium", "website").
  // Resolved to a safe, developer-controlled icon via SpeakerLinkUtil.resolveIcon /
  // the speakerLinkIcon pipe - never bound to <fa-icon> directly.
  kind: string;
}
