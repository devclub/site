import * as assert from 'assert';
import {SpeakerLinkUtil} from './SpeakerLinkUtil';

// Focused regression tests for Pre-mortem Sceptic findings 2 & 3.
//
// There is no Karma/Jasmine test runner wired into this project (no karma.conf.js,
// tsconfig.spec.json, or "test" architect target in angular.json), so this file is a
// plain, dependency-free assertion script executed directly via the ts-node devDependency
// that is already present (`npx ts-node --project src/tsconfig.json src/app/util/SpeakerLinkUtil.spec.ts`).
// It throws (non-zero exit) on the first failed assertion and prints a line per passing
// case, so it can be used as a CI-style smoke check even without a full test framework.

function run(name: string, fn: () => void) {
  fn();
  console.log(`  ok - ${name}`);
}

console.log('SpeakerLinkUtil.resolveIcon - prototype-chain "kind" values (finding 2)');

// These three keys all exist on every plain object literal's prototype chain. Before the
// fix, `SPEAKER_LINK_ICONS[kind]` returned the *inherited* Object.prototype member for
// each of these (truthy), bypassing the "unknown kind -> default icon" fallback and
// handing FontAwesome a value it cannot render.
run('kind "constructor" falls back to the default icon', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon('constructor'), ['fas', 'external-link-square-alt']);
});
run('kind "toString" falls back to the default icon', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon('toString'), ['fas', 'external-link-square-alt']);
});
run('kind "__proto__" falls back to the default icon', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon('__proto__'), ['fas', 'external-link-square-alt']);
});
run('kind "hasOwnProperty" falls back to the default icon', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon('hasOwnProperty'), ['fas', 'external-link-square-alt']);
});
run('an ordinary unrecognized kind ("bluesky") falls back to the default icon', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon('bluesky'), ['fas', 'external-link-square-alt']);
});
run('a recognized kind ("github") resolves to its own icon, case/whitespace-insensitively', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon('  GitHub '), ['fab', 'github']);
});
run('non-string kind values (runtime-untyped JSON) do not throw and fall back to the default icon', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon(42 as unknown as string), ['fas', 'external-link-square-alt']);
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon(null as unknown as string), ['fas', 'external-link-square-alt']);
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon(undefined as unknown as string), ['fas', 'external-link-square-alt']);
  assert.deepStrictEqual(SpeakerLinkUtil.resolveIcon({} as unknown as string), ['fas', 'external-link-square-alt']);
});

console.log('SpeakerLinkUtil.sanitizeSpeakerLinks - malformed "links" values (finding 3)');

run('undefined links (absent field) resolves silently to []', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(undefined), []);
});
run('null links resolves silently to []', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(null), []);
});
run('a non-array object value is rejected to [] (not returned as-is)', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks({foo: 'bar'}), []);
});
run('a non-array string value is rejected to [] (not returned as-is)', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks('https://example.com'), []);
});
run('a non-array number value is rejected to [] (not returned as-is)', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(42), []);
});
run('a valid array with a well-formed link keeps that link', () => {
  const links = [{url: 'https://github.com/example', label: 'GitHub', kind: 'github'}];
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(links), links);
});
run('an array member missing a label is dropped', () => {
  const links = [{url: 'https://github.com/example', label: '', kind: 'github'}];
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(links), []);
});
run('an array member with a non-string kind is dropped', () => {
  const links = [{url: 'https://github.com/example', label: 'GitHub', kind: 123}];
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(links), []);
});
run('an array member with a javascript: URL is dropped (unsafe scheme)', () => {
  const links = [{url: 'javascript:alert(1)', label: 'Evil', kind: 'website'}];
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(links), []);
});
run('an array member with an unparseable URL is dropped', () => {
  const links = [{url: 'not a url', label: 'Broken', kind: 'website'}];
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(links), []);
});
run('a non-object array member (string/number/null) is dropped without throwing', () => {
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks(['not-an-object', 42, null]), []);
});
run('valid and invalid members in the same array: only the valid one survives', () => {
  const valid = {url: 'https://example.com', label: 'Site', kind: 'website'};
  const invalid = {url: 'javascript:alert(1)', label: 'Evil', kind: 'website'};
  assert.deepStrictEqual(SpeakerLinkUtil.sanitizeSpeakerLinks([valid, invalid]), [valid]);
});

console.log('All SpeakerLinkUtil assertions passed.');
