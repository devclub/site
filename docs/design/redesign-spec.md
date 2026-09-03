# Devclub redesign — design specification

Design handoff for the visual refresh of **devclub.eu** and **devclub.ee**.
Written to be executed by the Software Engineer and verified by the Quality
Engineer without further design input.

Token values live in [`src/scss/_dc-tokens.scss`](../../src/scss/_dc-tokens.scss)
and are the normative source. This document explains how to apply them, what
every state must look like, and what "done" means.

**See it first.** Open [`docs/design/preview/index.html`](preview/index.html) in
a browser. It renders the direction from the real compiled token file and has a
site toggle that flips `data-dc-site` exactly the way the app will. Resize it —
the responsive rules in §8 are live in that page, not just described here. It is
a design artifact, not shipped code; the engineer builds the real thing in the
Angular app.

---

## 1. Scope

**In scope.** A new visual design across the pages that exist today: home /
upcoming meeting, archive (meetings, seminars, best, speakers), advertising,
about, speaker, plus the shared shell (navbar, hero band, team grid, sponsor
rows, footer).

**Out of scope.** No new pages, no new features, no content or copy changes, no
changes to the `data` repository, no changes to `devclubeu.github.io`. Meeting
information renders exactly the values it renders today.

**Both sites, one codebase.** `styles.scss` is shared by every build
configuration in `angular.json`, so per-site identity is a runtime CSS custom
property switched by a `data-dc-site` attribute on `<html>`, not a Sass value.

**Priorities.** Every requirement below is tagged:

- **P1** — required for the customer's acceptance. Ship blocker.
- **P2** — required for the quality bar (accessibility, states). Ship blocker.
- **P3** — recommended polish. Drop first if time is short.

---

## 2. Primary user and the shortest successful journey

**Primary user.** A working developer in Estonia deciding whether to attend the
next Devclub meetup. They arrive from a link in a chat group, usually on a
phone, usually with under a minute of attention.

**Shortest successful journey (the one the design optimises for):**

> Land on `/` → read *when* and *where* the next meeting is → see *what talks*
> are on → tap **Register**.

That is four glances. Today it takes longer than it should because the next
meeting sits in a flat pastel band with the same visual weight as everything
else on the page, and the date is set in body-size text.

**Second journey (highest traffic over time).** "Was that talk recorded?" →
`/archive` → filter by speaker or keyword → open the YouTube link. This journey
is a *scanning* task, which is why the archive gets tabular figures, sticky
table headers and a denser list mode.

**Design consequence.** The upcoming meeting is the loudest element on the home
page, and the archive is optimised for scan speed rather than decoration.

---

## 3. Visual direction

The site does not look dated because of its typeface or its structure. It looks
dated because of six specific things, all of which are addressed:

| # | What reads as "2014" today | What replaces it |
|---|---|---|
| 1 | Square corners everywhere | Radius scale, `0.625rem` default, pills for chips |
| 2 | Hard three-layer Material shadows (`.speech-container`) | Wide, low-opacity slate shadows |
| 3 | Pure greys (`#c1c1c1`, `#ccc`, `#666`) and pure black footer | Slate-tinted ink and surface ramps |
| 4 | Flat pastel hero band (`lightColor`) | Brand-tinted gradient wash fading into the page |
| 5 | Grey `h1.text-muted` page titles over a grey rule | Ink-900 display headings with an accent eyebrow |
| 6 | 12px overlay captions, cramped 1.4 line height | 13px floor, 1.65 body leading, fluid heading scale |

**What stays.** The Devclub logo, the navbar/footer brand colour taken from the
data repo, the "Knock, knock, Neo." splash, the meeting/talk information
architecture, and every existing route.

**Typeface decision (and why there is no webfont).** Content is Russian,
English and Estonian. A webfont would need Cyrillic plus Latin Extended — around
100 KB before a single meeting paints, on a static GitHub Pages host, against an
explicit "pages feel quick" requirement. The system stack covers all three
scripts natively and paints on the first frame. Modernisation comes from scale,
weight and rhythm instead. `--dc-font-mono` carries the developer character on
meeting numbers and dates.

---

## 4. Token application

### 4.1 Wiring order (P1)

`src/scss/styles.scss` must follow exactly this order. Sass requires `@use`
before any `@import`, and Bootstrap's `!default` variables only pick up values
declared before its import.

```scss
@use 'dc-tokens' as dc;   // 1. tokens + :root custom properties

$primary: dc.$dc-accent;  // 2. override Bootstrap defaults
// ... full mapping table below ...

@import 'bootstrap/scss/bootstrap';   // 3. Bootstrap compiles with our values

// 4. app layer: component skins, per-site custom-property re-pointing
```

Verified to compile against `bootstrap@5.3.8` / `sass@1.101.0`, emitting 90
`--dc-*` custom properties, `--bs-primary: #1a7a3c`,
`--bs-border-radius: 0.625rem` and `--bs-body-color: #33414f`, with the fluid
`clamp()` heading steps surviving compilation intact. The colour-function
deprecation warnings that appear come from Bootstrap's own internals and are
pre-existing on `main`.

Every variable name in §4.2 was checked to exist in this exact Bootstrap
version. One correction worth calling out: the variable that controls
`.text-muted` in Bootstrap 5.3 is `$body-secondary-color`, **not**
`$secondary-color` — the latter does not exist and would silently no-op.

### 4.2 Bootstrap variable mapping (P1)

| Bootstrap variable | Value | Effect |
|---|---|---|
| `$primary` | `dc.$dc-accent` | Links, active tab, primary buttons |
| `$danger` | `dc.$dc-danger` | "Talk!" CTA, foreign-language flag |
| `$success` / `$info` / `$warning` | `dc.$dc-success` / `$dc-info` / `$dc-warning` | Badges |
| `$body-color` | `dc.$dc-ink-700` | Body copy |
| `$body-bg` | `dc.$dc-surface-0` | Page |
| `$body-secondary-color` | `dc.$dc-ink-500` | `.text-muted` / `.text-body-secondary`. **Set explicitly** — Bootstrap otherwise derives `rgba($body-color, .75)`, which lands on `#66717b`: 4.98:1 on white but below 4.5:1 on `--dc-surface-2`, where muted text appears in the filter panel and table headers |
| `$font-family-sans-serif` | `dc.$dc-font-sans` | Everything |
| `$font-family-monospace` | `dc.$dc-font-mono` | Meeting numbers, dates |
| `$font-size-base` | `1rem` | 16px floor |
| `$line-height-base` | `dc.$dc-leading-body` | 1.65 |
| `$headings-color` | `dc.$dc-ink-900` | Kills the grey `.text-muted` title look |
| `$headings-font-weight` | `dc.$dc-weight-semibold` | 600 |
| `$headings-line-height` | `dc.$dc-leading-snug` | 1.3 |
| `$border-radius` | `dc.$dc-radius` | Cards, inputs, buttons |
| `$border-radius-sm` / `-lg` / `-xl` | `dc.$dc-radius-sm` / `-lg` / `-xl` | |
| `$border-radius-pill` | `dc.$dc-radius-pill` | Badges |
| `$border-color` | `dc.$dc-line` | Hairlines |
| `$link-decoration` | `none` | |
| `$link-hover-decoration` | `underline` | Underline on intent, not at rest |
| `$box-shadow-sm` / `$box-shadow` / `$box-shadow-lg` | `dc.$dc-shadow-sm` / `-md` / `-lg` | |
| `$input-bg` | `dc.$dc-surface-0` | |
| `$input-border-color` | `dc.$dc-line-strong` | **3:1 minimum, do not lighten** |
| `$input-focus-border-color` | `dc.$dc-accent` | |
| `$card-border-color` | `dc.$dc-line` | |
| `$card-cap-bg` | `dc.$dc-surface-2` | `.card-header` |
| `$nav-tabs-border-color` | `dc.$dc-line` | |
| `$nav-tabs-link-active-color` | `dc.$dc-accent` | |
| `$table-border-color` | `dc.$dc-line` | |
| `$table-hover-bg` | `dc.$dc-surface-1` | |
| `$table-cell-padding-y` | `dc.$dc-space-3` | Breathing room in the archive |
| `$btn-font-weight` | `dc.$dc-weight-semibold` | |
| `$btn-padding-y` / `-x` | `dc.$dc-space-2` / `dc.$dc-space-4` | 44px min target |
| `$enable-shadows` | `false` | Keep flat fills; elevation comes from our shadows |
| `$enable-gradients` | `false` | |
| `$enable-smooth-scroll` | `true` | |

### 4.3 Per-site accent re-pointing (P1)

Bootstrap bakes `$primary` into component variables literally, so the accent
will not follow `data-dc-site` unless it is re-pointed in the app layer, after
the Bootstrap import:

```scss
.btn-primary {
  --bs-btn-bg: var(--dc-accent);
  --bs-btn-border-color: var(--dc-accent);
  --bs-btn-hover-bg: var(--dc-accent-hover);
  --bs-btn-hover-border-color: var(--dc-accent-hover);
  --bs-btn-active-bg: var(--dc-accent-hover);
  --bs-btn-active-border-color: var(--dc-accent-hover);
  --bs-btn-disabled-bg: var(--dc-accent);
  --bs-btn-disabled-border-color: var(--dc-accent);
}

a { --bs-link-color-rgb: none; color: var(--dc-accent); }
a:hover, a:focus-visible { color: var(--dc-accent-hover); }

.nav-tabs .nav-link.active { color: var(--dc-accent); }
```

### 4.4 Runtime brand seed (P1)

`config.baseColor` and `config.lightColor` come from the live data host and
cannot be edited in this work. They stay, but **constrained**:

| Config value | EU | EE | Allowed use |
|---|---|---|---|
| `baseColor` | `#12480c` | `#314f6a` | Navbar + footer background only, behind white text (10.73:1 / 8.55:1) |
| `lightColor` | `#a7c1a4` | `#b3c8db` | Seed for the hero wash hairline only — **never a flat fill** |

`DcContainerComponent` must publish them as custom properties on the host
element rather than binding `[ngStyle]` per element:

```ts
// replaces the two [ngStyle] bindings on navbar and footer
@HostBinding('style.--dc-brand-shell') shell = appContext.config.baseColor;
@HostBinding('style.--dc-brand-seed') seed = appContext.config.lightColor;
```

Rationale: `#12480c` is a dark, desaturated green. It is excellent behind white
text and unusable as interactive colour — as an accent on white it fails
contrast against its own hover state and reads muddy. It therefore never
becomes `$primary`. The vivid `--dc-accent` values in the token file are derived
from the same hue family so the brand still reads as "the green site" and "the
blue site".

---

## 5. Global foundations

### 5.1 Shell — navbar (P1)

- Background `var(--dc-brand-shell)`. Add class `dc-shell` to `<nav>` and
  `<footer>` (this is what flips the focus ring to white).
- Height `--dc-header-height` (4rem). Sticky, `z-index: 1030`.
- On scroll past 8px add `.dc-shell--scrolled`: `box-shadow: var(--dc-shadow-md)`
  and `backdrop-filter: saturate(140%) blur(8px)` with the background at 92%
  alpha. Purely decorative; must degrade to the solid colour where
  `backdrop-filter` is unsupported.
- Brand: logo at 28px, wordmark in `--dc-font-mono`, `letter-spacing: 0.04em`,
  weight 600.
- Nav links: `#D7E2D6` on EU / `#D6E0EA` on EE at rest (8.04:1 / 6.39:1), white
  on hover and when active. Active link carries a 2px underline in white, not a
  background fill.
- Language switcher (`EST / ENG / РУС`): render as a single segmented control
  with `--dc-radius-pill`. The active language is the only one with a filled
  background. **Keep each language an `<a>` whose accessible name is exactly
  `EST`, `ENG`, `РУС`** — the e2e suite selects on those names.
- Mobile (`<992px`): the collapsed panel slides down with
  `var(--dc-duration-base) var(--dc-ease-standard)`; the toggler is a 44×44px
  target and must carry `aria-expanded` bound to `isMenuOpen`,
  `aria-controls="navbarNavDropdown"` and an `aria-label`.

### 5.2 Shell — footer (P1)

Currently pure black `#000`. Change to `var(--dc-brand-shell)` so the shell is
one continuous identity, with resource links at `#FFFFFF` and the copyright line
at 78% white. Add `--dc-space-7` top padding. Remove the `footer a { color:#fff }`
override chain in favour of a scoped `.dc-shell a` rule.

### 5.3 Focus (P1, accessibility blocker)

Delete both copies of this rule — they are in
`dc-team-rows.component.css` and `dc-about-page.component.css`:

```css
*:focus, *:visited { outline: none !important; }   /* DELETE */
```

It removes the focus indicator from every element on the page, including the
navbar and every archive control. Replace globally:

```scss
:focus-visible {
  outline: var(--dc-focus-width) solid var(--dc-focus-ring);
  outline-offset: var(--dc-focus-offset);
  border-radius: var(--dc-radius-sm);
}
:focus:not(:focus-visible) { outline: none; }
```

**The offset is load-bearing.** A ring painted directly on a filled button
measures 1.22:1 against the EU accent and 2.85:1 against the danger red — both
fail. With a 2px gap the ring is measured against the page surface, where it
passes at 5.39:1 (EU) and 5.28:1 (EE). Inside the dark shell the accent ring
collapses to 1.99:1 / 1.62:1, which is why `.dc-shell` re-points
`--dc-focus-ring` to white (10.73:1 / 8.55:1).

### 5.4 Motion (P2)

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Link / icon colour | `color` | `--dc-duration-fast` | `--dc-ease-standard` |
| Button, chip hover | `background-color`, `box-shadow` | `--dc-duration-fast` | `--dc-ease-standard` |
| Card hover lift | `transform`, `box-shadow` | `--dc-duration-base` | `--dc-ease-standard` |
| Navbar collapse | `height` | `--dc-duration-base` | `--dc-ease-standard` |
| Image overlay reveal | `opacity` | `--dc-duration-base` | `--dc-ease-out` |
| Fullscreen promo enter | `opacity`, `transform` | `--dc-duration-slow` | `--dc-ease-out` |

Never animate `width`/`height`/`top`/`left` for decoration. Card lift is capped
at `translateY(-2px)`. The token file already collapses all three durations to
`1ms` under `prefers-reduced-motion: reduce`; additionally suppress the card
lift transform entirely in that media query.

### 5.5 Headings and the title row (P1)

`dc-title-row` currently renders `<h1 class="text-muted">` above a grey rule and
is used as a *section* heading on six pages — semantically wrong (multiple h1s)
and visually the single most dated element.

Replace with:

- `<h2>` at `--dc-text-h2`, `--dc-ink-900`, weight 600, `--dc-tracking-tight`.
- An eyebrow above it: uppercase, `--dc-text-micro`, `--dc-tracking-eyebrow`,
  `--dc-accent`, rendered from a new optional `eyebrow` input — **or**, if no
  content is available, a 3rem × 3px accent bar in `--dc-accent` with
  `--dc-radius-pill`. The accent bar requires no content change; prefer it.
- Replace `.light-border` (1px `#ccc`) with `--dc-line`, or drop the rule
  entirely and use `--dc-space-6` top margin. Whitespace separates better than
  a line does.
- The page-level `<h1>` remains exactly one per page: on `/` it is the meeting
  title, elsewhere it is the first `dc-title-row`, which must therefore accept a
  `level` input (`1` or `2`, default `2`).

### 5.6 Surfaces and rhythm (P1)

- Page background `--dc-surface-0`. Alternate full-bleed sections with
  `--dc-surface-1` to create rhythm: hero → white → surface-1 → white.
- Vertical section spacing `--dc-space-7` (3rem) mobile, `--dc-space-8` (4rem)
  from `md` up. Replace the current ad-hoc `mt-3`/`pt-3` scatter.
- Description paragraphs capped at `--dc-measure` (72ch).
- `font-variant-numeric: tabular-nums` on all dates, counts and meeting numbers.

---

## 6. Page and component specifications

### 6.1 Home — upcoming meeting hero (P1)

`dc-meeting-block` is the primary journey. Today it is a flat `lightColor` band.

**Layout.** Full-bleed band, `--dc-space-7` vertical padding, background:

```scss
background:
  linear-gradient(180deg, var(--dc-hero-wash) 0%, var(--dc-surface-0) 100%);
border-bottom: 1px solid color-mix(in srgb, var(--dc-brand-seed) 60%, transparent);
```

This is the only permitted use of `--dc-brand-seed`. Text stays dark, which
matters because the same `dc-meeting-info-block` component is reused on the
archive page over white — one component, two contexts, one set of colours.

**Content hierarchy inside the hero**, top to bottom:

1. Eyebrow chip — "next meeting" affordance, `--dc-accent-soft` background,
   `--dc-accent-on-soft` text, pill radius. Uses the existing
   `common.title.meeting` string plus `#{num}`; no new copy.
2. Meeting title at `--dc-text-display`, `--dc-ink-900`, `--dc-tracking-tight`.
3. Date / time / venue as an icon-led metadata row: `--dc-text-body`,
   `--dc-ink-600`, icons at `--dc-accent`, `tabular-nums`, wrapping to one item
   per line below `sm`.
4. **Register** button — `.btn-primary`, `--dc-radius-pill`, `--dc-space-3`
   vertical padding, full width below `sm`, auto width from `sm` up. It is
   currently `.btn-info` floated right in a 3-column cell where it is easy to
   miss; promote it.
5. Talks, as cards (§6.2).

**Empty state (P1).** `nextMeetings.length === 0` already renders
`main.next_meeting.info.not_avaliable`. Restyle, do not rewrite: centred, in a
dashed-border panel at `--dc-radius-lg` on `--dc-surface-1`, message at
`--dc-ink-600`, with a calendar icon at `--dc-ink-500` above it, and a
secondary link to `/archive` using the existing `menu.archive` string. The band
keeps its gradient so the page never looks broken.

### 6.2 Talk card — `dc-meeting-info-block` (P1)

Used in the hero and throughout the archive. One skin, both places.

- Replace the inline `style="background-color: #FFFFFF"` on `.speech-container`
  with a class. Card: `--dc-surface-0`, `--dc-radius-lg`, `--dc-shadow-sm`,
  `1px solid --dc-line`, `--dc-space-5` padding.
- Hover (pointer devices only, `@media (hover: hover)`):
  `--dc-shadow-md` and `translateY(-2px)`.
- Speaker photo: keep the circular crop. Constrain to `112px` at `sm`+, `88px`
  below. The current `.img-fluid` override (`width:60%; margin-left:20%`) is a
  hack that fights the grid — replace with an explicit size and
  `margin-inline: auto`.
- **Person column width: `minmax(150px, 168px)`, not the 112px avatar width.**
  Sizing the column to the avatar wraps a normal Estonian or Russian full name
  onto two lines and the job title onto three. Verified in the reference.
- Speaker name `--dc-text-h4` weight 600 `--dc-ink-900`; title
  `--dc-text-small` `--dc-ink-500`. Both at `--dc-leading-snug` — the 1.65 body
  leading is too airy for a two-line stacked label.
- Talk title `--dc-text-h3`, `--dc-ink-900`.
- Description `--dc-text-body`, `--dc-ink-700`, capped at `--dc-measure`.
- The `a.dotted` speaker link (black text, dashed underline) becomes
  `--dc-accent` with `text-decoration: underline` and
  `text-underline-offset: 0.2em`. Remove the `border-bottom: dashed` hack.

**Chips (P2, accessibility fix).** The current badges fail contrast badly —
`.badge-lang` is white on `#c1c1c1` (1.80:1) and `.badge-label` is white on
translucent blue (2.35:1). Both become soft-tinted chips with dark text:

| Chip | Background | Text | Ratio |
|---|---|---|---|
| Topic label | `--dc-accent-soft` | `--dc-accent-on-soft` | 6.97:1 EU / 6.86:1 EE |
| Language (matches UI) | `--dc-surface-2` | `--dc-ink-700` | 9.29:1 |
| Language (differs) | `--dc-danger-soft` | `--dc-danger-on-soft` | 6.78:1 |

Chip metrics: `--dc-radius-pill`, `--dc-text-micro`, weight 500,
`0.25rem 0.625rem` padding. This replaces `.badge-big`, `.badge-lang` and
`.badge-label`. Clickable chips (`clickLabelFn`) additionally get
`cursor: pointer`, a hover background one step darker, and **must be `<button>`
elements** — they are currently `<span (click)>`, unreachable by keyboard.

**Ranking icons (P2).** `.place1`–`.place9` currently include `#cdcdcd` silver
at 1.55:1 (invisible). Remap to `--dc-place-1/2/3/other` (5.54 / 4.83 / 6.76 /
5.23). Because the trophy conveys meaning, keep the existing `tooltip` and add
`aria-label` carrying the same string.

**Fullscreen promo (P3).** Keep the layout logic untouched. Restyle: background
`--dc-ink-900` instead of `#052c4b`, `--dc-radius-xl` on the stacked photos'
ring, close button as a 44×44px target with a visible `:focus-visible` ring at
white. Add `role="dialog"`, `aria-modal="true"`, focus trap, focus restore to
the expand trigger on close, and `Escape` to close — none of which exist today.

### 6.3 Archive shell and tabs (P1)

- Keep `ul.nav-tabs` and `role="tab"` exactly — both are e2e contract (§9).
- Restyle to an underline tab set: no boxes, no border radius on the tab itself.
  Rest `--dc-ink-500`; active `--dc-accent` with a 2px `--dc-accent` bottom
  border; hover `--dc-ink-800`. Container keeps a 1px `--dc-line` bottom rule.
- Below `md` the tab strip scrolls horizontally: `overflow-x: auto`,
  `scroll-snap-type: x proximity`, `flex-wrap: nowrap`, scrollbar hidden. Never
  let four tabs wrap into two ragged rows.
- Add the missing ARIA: `role="tablist"` is present on the `ul`, but each tab
  needs `aria-selected` bound to the active check and the panel needs
  `role="tabpanel"` with `aria-labelledby`.

### 6.4 Archive filters (P1)

The filter row (speaker, text, label, season, view mode) is the control surface
for the second journey.

- Wrap all five controls in one panel: `--dc-surface-1`, `--dc-radius-lg`,
  `1px solid --dc-line`, `--dc-space-5` padding, `--dc-space-6` bottom margin.
- Labels: `--dc-text-micro`, weight 600, `--dc-ink-600`, `--dc-space-1` below.
  They are currently bare `<label>` at body size and read as content.
- Inputs: `--dc-radius`, `--dc-line-strong` border (3.44:1), 44px min height,
  `--dc-accent` focus border plus the global outline ring.
- The clear (`×`) affordances are `<span (click)>` — keyboard-unreachable.
  Convert to `<button type="button">` with an `aria-label` and a 44×44px target
  (**P2**). Same for the season `‹ ›` steppers.
- Keep `select#season` as a `<select>` with that exact id — e2e contract.
- View toggle (list/block): render as a segmented control, `--dc-radius-pill`
  container, active segment filled with `--dc-accent-soft` and
  `--dc-accent-on-soft` text. Add `aria-pressed` to both buttons.
- Below `md` the five controls stack full width in the order speaker → text →
  label → season → view.

**Empty result state (P2).** Filtering to zero matches currently renders
nothing — the list simply disappears, which is indistinguishable from a
loading failure. Add a panel: `--dc-surface-1`, `--dc-radius-lg`, a search icon
at `--dc-ink-500`, the existing `archive.main.filter.*` context, and a
**Clear filters** button that resets all four filters. Use existing strings; if
none fits, the Technical Writer supplies one key —
`archive.main.filter.no_results`.

### 6.5 Archive — speakers table (P1)

`table.table-hover`, columns: rank, date, name, talk count, and (EU only) a
five-badge ranking cluster.

Desktop:

- `--dc-surface-0` background, `--dc-line` row separators, no outer border.
- `thead` on `--dc-surface-2`, `--dc-text-micro`, uppercase,
  `--dc-tracking-eyebrow`, `--dc-ink-600`.
- **Sticky header**: `position: sticky; top: var(--dc-header-height)` so column
  meaning survives a long scroll.
- Row hover `--dc-surface-1`. Numeric cells `tabular-nums`.
- Sort affordance (P2): the headers are `<a href="javascript:void(0)">` with no
  indication of which column is active. Sorting is single-direction and stays
  that way — this is presentation only. Track the active column in one field
  (`activeSort`, initialised to `'date'` because the constructor calls
  `sortByDate()`), render `aria-sort` on the active `<th>` (`descending` for
  date/count/top, `ascending` for name), show a chevron in `--dc-accent`, and
  convert the anchors to `<button>` so they are announced correctly.

Mobile, `<768px` — **this layout is explicitly owned by design**:

Measured: without these rules the table renders 379px wide in a 320px viewport
and pushes the whole page sideways. With them it renders at 273px and the scroll
wrapper never engages. Apply all of them; they are load-bearing together.

```scss
@media (max-width: 767.98px) {
  .dc-breakdown { display: none; }              // medal breakdown -> total only
  .dc-table th, .dc-table td { padding: var(--dc-space-2) var(--dc-space-1); }
  .dc-table th:first-child,  td:first-child  { width: 2.25rem; padding-left: 0; }
  .dc-table th:nth-child(2), td:nth-child(2) { white-space: nowrap;
                                               font-size: var(--dc-text-micro); }
  .dc-table th:nth-child(3), td:nth-child(3) { width: 100%; }   // name absorbs slack
  .dc-table th:nth-child(4), td:nth-child(4) { width: 3rem; text-align: center; }
  .dc-table th:last-child,   td:last-child   { width: 3rem; text-align: center;
                                               padding-right: 0; }
  .dc-table thead th { font-size: 11px; letter-spacing: .04em; }
}
```

- Wrap the table in `.table-responsive` as a safety net for unusually long
  names. With the rules above it should never actually need to scroll.
- The `<thead>` badge legend (`I II III >III = Total`) is decoration. Hide it
  below `md` with `d-none d-md-inline` while keeping the sortable header label.
- The ranking cell collapses to the **total pill only** below `md`. The total is
  already computed in the template, so no logic changes.
- Header sort controls keep a 44px target despite the reduced cell padding.
- Keep `table.table-hover` and the real `<table>`/`<th>`/`<td>` semantics. Do
  **not** convert this table to a `display: grid` stack — it has a genuine
  `<thead>` and collapsing it would remove the row/column association that
  screen-reader users rely on.
- The 11px `thead` size is the one permitted exception to the 13px floor: it
  applies to uppercase, letter-spaced column labels only, never to content.

### 6.6 Archive — seminars table (P1)

`table.table-bordered`. Structurally this is **not** a data table: it has no
`<thead>` and no `<th>`; it uses `colspan="6"` rows to draw bordered groups.

- Add `role="presentation"` to the `<table>`. This is the correct semantics for
  a layout table and it is what makes the mobile re-layout below safe. The class
  `table-bordered` stays — e2e contract.
- Desktop: render each seminar as a card rather than bordered rows — drop the
  cell borders, give each seminar group `--dc-surface-0`, `--dc-radius-lg`,
  `1px solid --dc-line`, `--dc-shadow-xs`, and `--dc-space-5` bottom margin.
  Title row (`.table-secondary`) becomes a `--dc-text-h4` heading on
  `--dc-surface-2` with the group's top corners rounded.
- The six-fact row (date, duration, language, links, seats, venue) below `768px`:

```scss
@media (max-width: 767.98px) {
  table.table-bordered tr.dc-seminar-facts {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--dc-space-2) var(--dc-space-4);
  }
  table.table-bordered tr.dc-seminar-facts > td { border: 0; padding: 0; }
}
```

  Add the `dc-seminar-facts` class to that one `<tr>`. Two columns at 320px,
  each fact on its own line, no horizontal scroll. Safe precisely because the
  table is `role="presentation"`.
- The intro sentence above the table is hardcoded Russian in the template. Leave
  it exactly as is — copy is out of scope.

### 6.7 Archive — best talks (P1)

- Group headers (`.row.border-bottom.small`) become eyebrow labels: uppercase,
  `--dc-text-micro`, `--dc-tracking-eyebrow`, `--dc-ink-500`, with an
  `--dc-line` rule.
- Group-by toggle uses the same segmented control as the archive view toggle.
- Rank number in `--dc-font-mono` at `--dc-ink-500`, `tabular-nums`.

### 6.8 Archive — compact list rows (P1)

`dc-meeting-info-list` and `dc-speech-row` are the dense scanning mode.

- The meeting header row has a hardcoded `height: 28px` that clips descenders
  in Cyrillic and any wrapped title. Replace with `min-height: 2rem` and
  `padding-block: --dc-space-1`.
- Meeting header: date + `#num` in `--dc-font-mono` `--dc-ink-500`, title in
  `--dc-ink-800` weight 600, on `--dc-surface-1` with `--dc-radius-sm`.
- Speech rows: `--dc-space-2` vertical padding, `--dc-line` separator, hover
  `--dc-surface-1`, icons at `--dc-ink-500` going `--dc-accent` on hover.
- **Do not change** the `.text-muted` class on the meeting header cell or the
  `<span>` inside it — the season-switch e2e test selects
  `dc-meeting-info-list .text-muted span`.

### 6.9 Team grid (P1)

- Photos: `--dc-radius-lg`, `aspect-ratio: 1/1`, `object-fit: cover`,
  `--dc-shadow-xs`.
- Replace the `.image-lighten` white-veil-at-30%-that-fades-on-hover with the
  inverse: photos render at full fidelity at rest, and hover applies a bottom
  gradient scrim plus a `translateY(-2px)` lift. The current treatment washes
  out every face by default, which is the single largest "old site" tell on the
  home page.
- The name caption (`.member-text`) is 12px white with a four-way text-shadow.
  Replace with `--dc-text-micro` (13px), weight 600, white over a
  `linear-gradient(transparent, rgba(11,18,32,0.78))` scrim — a real scrim
  instead of a shadow hack. Show it at all breakpoints, not `d-none d-md-block`;
  on mobile the caption is *more* useful, not less.
- Empty padding cells (`emptyCell`) keep occupying grid space — do not collapse
  them, the row-balancing logic depends on it.

### 6.10 Latest videos (P1)

Same treatment as the team grid: `--dc-radius-lg` thumbnail, real gradient scrim
instead of `text-shadow`, title at `--dc-text-small` weight 600 clamped to two
lines (`-webkit-line-clamp: 2`), published date at `--dc-text-micro` at 82%
white. Hover lifts and reveals a play glyph. The block is already gated on
`videos.length > 0`; keep that — a YouTube API failure hides the section
silently, which is correct for a decorative block.

### 6.11 Sponsor rows (P2)

`dc-ads-row-upper` / `-lower`. Logos on white at varying weights currently look
like clutter.

- Uniform tiles: `--dc-surface-1`, `--dc-radius`, `--dc-space-4` padding,
  `max-height: 72px` logo, `object-fit: contain`.
- Rest at `opacity: 0.72` + `filter: saturate(0.85)`; full colour on hover.
- The upper row is `d-none d-sm-block` — it disappears entirely on phones.
  Keep that behaviour (it is an existing product decision), but make the lower
  row a 2-up grid on mobile rather than hiding it.
- Every logo `<img>` already has `alt="{{item.name}}"`. Keep it.

### 6.12 Advertising, speaker, about (P1)

All three are card-based already.

- Cards: `--dc-radius-lg`, `1px solid --dc-line`, `--dc-shadow-xs`, no
  Bootstrap default grey. `.card-header` (`h6`) becomes `--dc-surface-2`,
  `--dc-text-h5`, weight 600, `--dc-ink-900`, `--dc-space-4` padding.
  **Keep the `.card-header` class** — e2e contract.
- Advertising price table: `tabular-nums`, right-aligned numerics (already),
  `--dc-surface-1` header, no vertical rules, `--dc-space-3` cell padding.
- Speaker page: the primary CTA (`a.btn-danger[target="_blank"]`) becomes a
  large pill button, `--dc-space-3` × `--dc-space-6` padding, centred, with
  `--dc-shadow-sm`. **Keep `btn-danger` and `target="_blank"`** — e2e contract.
  Add an external-link icon and `rel="noopener noreferrer"`.
- About page: the `<iframe>` calendar keeps `height="200"` but gains
  `--dc-radius`, `1px solid --dc-line`, `width: 100%`, and a `title` attribute
  (it has none — a screen-reader defect). Brand logo trio becomes a
  three-up tile grid that stacks 1-up below `sm`.
- Photo grid: `--dc-radius`, scrim caption as in §6.9, `--dc-text-small`.

---

## 7. State inventory

Route guards resolve all data before a page renders and swallow fetch failures
via `catchError(() => of([]))`. Two consequences drive the states below:
navigation has **no visible progress**, and a failed fetch is **visually
identical to an empty archive**.

| State | Where it occurs | Required treatment | P |
|---|---|---|---|
| **Initial boot** | `.start-page` splash before Angular bootstraps | Keep the Matrix splash — it is brand. Restyle: `--dc-ink-900` background instead of `#000`, logo centred, "Knock, knock, Neo." in `--dc-font-mono` at `--dc-text-micro` in `--dc-accent`, `opacity` fade-out over `--dc-duration-slow` on boot | P1 |
| **Navigating / resolving** | Every guard-protected route; can run seconds on slow links | 2px determinate-looking progress bar under the navbar in `--dc-accent`, animating indefinitely while the guard runs. Set `aria-busy="true"` on `<main>`. Without this, clicking "Archive" on a slow connection looks like a dead click | P1 |
| **Loading placeholder** | Archive and home content areas | Skeleton blocks at `--dc-surface-2` with a 1.4s shimmer, matching card and row geometry. Suppress shimmer under `prefers-reduced-motion` (show static blocks) | P3 |
| **Empty — no upcoming meeting** | `nextMeetings.length === 0` | §6.1. Existing string, restyled panel, link onward to the archive | P1 |
| **Empty — filters match nothing** | Archive filters | §6.4. Panel plus **Clear filters** reset | P2 |
| **Partial — some archive files failed** | `forkJoin` where one URL 404s | Render what loaded, plus a dismissible `--dc-warning` notice above the list stating some entries could not be loaded. Never fail the whole page | P2 |
| **Error — all data failed** | Every archive URL fails | Panel on `--dc-surface-1`: warning icon at `--dc-warning`, explanation, **Retry** button re-running the guard. Must be distinguishable from the empty state | P2 |
| **Error — config failed** | `AppContext.config` unavailable at bootstrap | The app cannot render its shell. Show a minimal centred card on `--dc-surface-1` with the logo and a retry link. Do not leave the black splash on screen indefinitely | P2 |
| **Offline** | `navigator.onLine === false` | Reuse the error panel copy with an offline icon | P3 |
| **Success — registration** | Register / Talk CTAs | Both open external targets in a new tab. Add an external-link icon plus `rel="noopener noreferrer"` so the tab change is predicted, not just experienced | P1 |
| **Completed — past meeting** | Archive meetings | A past meeting must not show a Register CTA. `showRegisterEvent` already gates this; verify it renders `false` for archive rows | P1 |
| **Pushback — validation** | No forms in the product | Not applicable. All input is client-side filtering with no invalid states. If a filter yields nothing, that is the empty-result state, not an error | — |
| **Disabled** | Season stepper at range ends; `seasonDisabled` | `opacity: 0.5`, `cursor: not-allowed`, `aria-disabled="true"`. Currently the steppers are simply removed from the DOM, which makes the control jump width — reserve the space instead | P3 |
| **Hover (pointer only)** | Cards, rows, tiles | Wrap every hover effect in `@media (hover: hover)` so touch devices do not get sticky hover states | P2 |

---

## 8. Responsive specification

Bootstrap breakpoints, unchanged: `sm 576` / `md 768` / `lg 992` / `xl 1200` /
`xxl 1400`. Design targets are **320 / 768 / 1280**.

| Region | 320–575 | 576–991 | 992+ |
|---|---|---|---|
| Navbar | Collapsed, 44px toggler, slide-down panel | Collapsed to 991 | Full horizontal |
| Language switcher | Segmented, full width in panel | Segmented in panel | Inline left |
| Hero | 1 column, display type at clamp floor, CTA full width | 1 column, CTA auto width | 1 column, capped at container |
| Talk card | Photo above text, 88px circle | Photo left, 112px | Photo left, 112px |
| Archive filters | 5 stacked, full width | 2 per row | speaker+text on row 1, label+season+view on row 2 |
| Speakers table | §6.5 mobile rules, `.table-responsive` | Full table | Full table + sticky head |
| Seminars table | 2-col fact grid (§6.6) | Full row | Full row |
| Team grid | 2 up | 3 up | Existing 5-up matrix |
| Latest videos | 1 up | 2 up | 2 up |
| Sponsor rows | Lower row 2-up; upper row hidden (existing) | 3 up | Existing flex row |
| Advertising / speaker cards | 1 column | 1 column | 2 columns (existing `col-md-6`) |
| About photo grid | 1 up | 3 up | 6 up (existing) |

**Hard rules.**

- No horizontal page scroll at 320px on any route. Verify with
  `document.documentElement.scrollWidth <= window.innerWidth`.
- Minimum interactive target 44×44px, including table sort headers, filter
  clear buttons, season steppers and the navbar toggler.
- The fullscreen promo view is desktop-oriented; below `md` it must still be
  dismissible and must not trap scroll.
- `anyComponentStyle` budget in `angular.json` is **4 KB warning / 10 KB error**
  per component stylesheet. Shared skins belong in `styles.scss`, not in
  component CSS.

---

## 9. Accessibility

### 9.1 Contrast ledger

Every value measured against WCAG 2.1 relative luminance. Text minimum 4.5:1,
non-text minimum 3:1.

| Pair | Ratio | Min | |
|---|---|---|---|
| `--dc-ink-900` on surface-0 | 18.72 | 4.5 | pass |
| `--dc-ink-700` on surface-0 | 10.45 | 4.5 | pass |
| `--dc-ink-500` on surface-0 | 5.23 | 4.5 | pass |
| `--dc-ink-500` on surface-2 | 4.69 | 4.5 | pass |
| `--dc-ink-500` on EU hero wash | 4.71 | 4.5 | pass |
| `--dc-ink-500` on EE hero wash | 4.64 | 4.5 | pass |
| EU accent on surface-0 | 5.39 | 4.5 | pass |
| White on EU accent | 5.39 | 4.5 | pass |
| EE accent on surface-0 | 5.28 | 4.5 | pass |
| White on EE accent | 5.28 | 4.5 | pass |
| EU accent on EU hero wash | 4.86 | 4.5 | pass |
| EE accent on EE hero wash | 4.69 | 4.5 | pass |
| White on `--dc-danger` | 6.57 | 4.5 | pass |
| Accent-on-soft, EU chip | 6.97 | 4.5 | pass |
| Accent-on-soft, EE chip | 6.86 | 4.5 | pass |
| Danger-on-soft chip | 6.78 | 4.5 | pass |
| Neutral chip text on surface-2 | 9.29 | 4.5 | pass |
| White on EU shell `#12480c` | 10.73 | 4.5 | pass |
| White on EE shell `#314f6a` | 8.55 | 4.5 | pass |
| EU navlink `#D7E2D6` on shell | 8.04 | 4.5 | pass |
| EE navlink `#D6E0EA` on shell | 6.39 | 4.5 | pass |
| `--dc-line-strong` input border on surface-0 | 3.44 | 3.0 | pass |
| `--dc-line-strong` input border on surface-2 | 3.08 | 3.0 | pass |
| Focus ring, accent on surface-0 (EU / EE) | 5.39 / 5.28 | 3.0 | pass |
| Focus ring, white on shell (EU / EE) | 10.73 / 8.55 | 3.0 | pass |
| Rank colours 1 / 2 / 3 / other | 5.54 / 4.83 / 6.76 / 5.23 | 4.5 | pass |

Values rejected during design, recorded so they are not reintroduced:
`#6b7a8a` muted text (4.40), `#8a97a5` input border (2.98), accent ring drawn
directly on a filled button (1.22 EU / 2.85 danger), and the three legacy
values being replaced — `.badge-lang` (1.80), `.badge-label` (2.35), `.place2`
silver `#cdcdcd` (1.55).

### 9.2 Keyboard

- Every interactive element reachable in DOM order with a visible ring (§5.3).
- Convert to real controls: chip filters, filter clear buttons, season steppers,
  table sort headers, the promo expand/close triggers. All are `<span (click)>`
  or `href="javascript:void(0)"` today.
- Skip link as the first focusable element, targeting `<main id="main">`,
  visually hidden until focused. The navbar has 10+ links ahead of content.
- **Sticky-header scroll offset.** Anything that can become a scroll or focus
  target under the sticky navbar must carry
  `scroll-margin-top: calc(var(--dc-header-height) + var(--dc-space-4))` —
  `<main id="main">`, section headings, and the archive tab panels. Without it
  the browser aligns the target to `y=0`, the navbar covers it, and the user
  lands on what looks like a missing heading. This bites the skip link hardest:
  activating it appears to do nothing, because the element it moved focus to is
  behind the header. Found and fixed in the reference preview, where a 59px
  sticky bar occluded every section heading on jump.

  ```scss
  :root { --dc-header-height: 3.5rem; }
  #main, .dc-section, .tab-pane { scroll-margin-top: calc(var(--dc-header-height) + var(--dc-space-4)); }
  ```
- Tabs: arrow-key navigation between tabs, `Enter`/`Space` to activate, roving
  `tabindex`.
- Fullscreen promo: focus trap, `Escape` closes, focus restored to the trigger.
- No positive `tabindex` anywhere.

### 9.3 Screen reader

- `<html lang>` must track the active language (`ru` / `en` / `et`). It is
  hardcoded `lang="en"` in `index.html` while content is often Russian — screen
  readers pronounce it with the wrong voice. Bind it from `TranslationService`.
- One `<h1>` per route (§5.5); no skipped heading levels.
- Landmarks: `<header>`, `<nav>`, `<main id="main">`, `<footer>`.
- Icon-only links (camera, YouTube, slideshare, external, trophy) need
  `aria-label`; the visual tooltip is not exposed as an accessible name.
- The calendar `<iframe>` needs a `title`.
- Decorative images (`logo_desc.png`, sponsor tiles that duplicate adjacent
  text) take `alt=""`; meaningful ones keep descriptive `alt`.
- Sort state announced via `aria-sort` (§6.5).
- Language switcher: the active language carries `aria-current="true"`.

### 9.4 Motion and voice

- All decorative motion respects `prefers-reduced-motion` (§5.4); the token file
  handles durations, the engineer must also suppress the card-lift transform and
  the skeleton shimmer.
- No parallax, no autoplaying video, no content that moves without user intent.
- Voice control: every control's accessible name must match its visible label,
  so "click Archive" works. This is why icon-only buttons get labels that
  include their visible text where one exists, and why the language codes must
  stay exactly `EST` / `ENG` / `РУС`.

---

## 10. Selector contract (do not break)

The e2e suite in `e2e/navigation.spec.ts` runs against both sites in three
languages. These selectors and accessible names are load-bearing; restyle them,
never rename them.

| Selector / name | Used by |
|---|---|
| `dc-meeting-block` | home route render |
| `select#season` | archive render + season-switch test |
| `ul.nav-tabs` | best-tab route render |
| `table.table-hover` | speakers tab |
| `table.table-bordered` | seminars tab |
| `.card-header` | advertising route |
| `dc-short-info-block` | about route |
| `a.btn-danger[target="_blank"]` | speaker route CTA |
| `dc-meeting-info-list .text-muted span` | season-switch assertion |
| Link names `Встреча/Архив/Реклама/О нас` + `en`/`et` equivalents | navbar tests |
| Button name `Выступи!` / `Talk!` / `Osale!` | speaker CTA — stays a **button** role |
| Tab names `Встречи/Семинары/Лучшие/Выступающие` + equivalents | archive tab tests |
| Link names `EST` / `ENG` / `РУС` | language switcher test |

Note that the navbar speaker CTA is asserted with `getByRole('button')` while
being an anchor. It resolves as a button **only because the element carries an
explicit `role="button"` attribute**:

```html
<a class="btn btn-danger me-sm-2 mb-sm-0 mb-2" role="button" href="javascript:void(0)" ...>
```

Restyling that element is fine; dropping `role="button"` silently breaks the
navbar test. Keep it.

---

## 11. Acceptance criteria

### 11.1 Engineer — definition of done

1. Every P1 and P2 item above implemented.
2. `npm run build:eu` and `npm run build:ee` both succeed with no new warnings
   and within the existing budgets.
3. `npm run test` passes.
4. `npm run e2e` passes for both sites, unmodified — **if a selector assertion
   fails, the markup is wrong, not the test** (§10). The only permitted spec
   edits are additive tests.
5. No `outline: none` rule survives anywhere in the codebase.
6. No hardcoded hex value survives in component CSS or templates; everything
   references a `--dc-*` custom property. Grep target: zero matches for
   `#[0-9a-fA-F]{3,6}` under `src/app/**`.
7. `data/` and `devclubeu.github.io/` have zero diffs.
8. No content, translation key or meeting datum changed. New keys are permitted
   only for `archive.main.filter.no_results` and the error/retry panel, and only
   via the Technical Writer.

### 11.2 QA — verification matrix

Capture and attach screenshots at **320 / 768 / 1280** for **both sites**:

| # | Route | Verify |
|---|---|---|
| 1 | `/` | Hero reads as the loudest element; Register is unmissable; date is display-scale |
| 2 | `/` with no upcoming meeting | Empty panel renders, page does not look broken |
| 3 | `/archive` | Filter panel grouped; list/block toggle works; results scan cleanly |
| 4 | `/archive` filtered to zero | Empty-result panel + Clear filters resets |
| 5 | `/archive/speaker` | No horizontal page scroll at 320; sticky header; ranking collapses to total |
| 6 | `/archive/seminar` | Facts render as a 2-col grid at 320; cards not bordered rows |
| 7 | `/archive/best` (EU only) | Rank colours legible; group headers read as eyebrows |
| 8 | `/advertising` | Cards restyled; price table uses tabular figures |
| 9 | `/about` | Photo grid scrims; calendar iframe has a title |
| 10 | `/speaker` | CTA is a large pill; still `a.btn-danger[target="_blank"]` |
| 11 | All | Tab through the whole page: ring visible on every control, white inside the navbar/footer |
| 12 | All | 320px: `scrollWidth <= innerWidth` |
| 13 | All | `prefers-reduced-motion: reduce`: no lift, no shimmer, no slide |
| 14 | All | Switch EST/ENG/РУС: `<html lang>` follows, layout holds with the longest strings |
| 15 | EU vs EE | Accent is green vs blue; shell colour differs; **no other visual difference** |
| 16 | All | Activate the skip link, then jump to any in-page anchor: the target heading is fully visible, never hidden behind the sticky navbar (§9.2 scroll offset) |

Automated checks to add (**P2**): axe-core scan on all eight routes with zero
serious or critical violations, and a 320px horizontal-overflow assertion.

**Customer acceptance.** The customer opens both sites, clicks through every
page on a phone and a laptop, and agrees it looks modern and current. Journey 1
(§2) should take under 15 seconds on a phone from cold load.

---

## 12. Verification already performed

These are not predictions. Each was measured in a browser against the visual
reference, which uses the same compiled token file the app will consume. They
are the baseline the implementation must reproduce.

| Check | Result |
|---|---|
| Token layer compiles in the real Bootstrap chain | `sass@1.101.0` + `bootstrap@5.3.8`, exit 0, 90 `--dc-*` properties emitted |
| Bootstrap absorbs the tokens | `--bs-primary: #1a7a3c`, `--bs-border-radius: 0.625rem`, `--bs-body-color: #33414f`, `--bs-secondary-color: #5e6e7f` |
| Fluid type survives compilation | `--dc-text-display: clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)` intact |
| Per-site switch | `data-dc-site="ee"` flips accent `#1a7a3c → #1f6fb2`, wash, shell and focus ring together; brand text follows |
| Focus ring inside the shell | 9 shell elements tabbed: all `solid`, white, 2px width, 2px offset |
| Focus ring outside the shell | Register CTA + chips: all `solid`, accent-coloured, 2px/2px |
| Keyboard reach | Topic chips are tabbable as `<button>` — they are `<span (click)>` today |
| 320px overflow | `scrollWidth` 316 ≤ `innerWidth` 320. No page-level horizontal scroll |
| 320px archive table | Fits in 273px with the §6.5 column rules; scroll wrapper never has to engage |
| 320px layout | Filters 1-up, talk card stacked, tiles 2-up, medal breakdown hidden, total pill retained |
| 768px layout | `scrollWidth` 753 ≤ 768. Filters 2-up, tiles 3-up, talk card 2-col, breakdown visible |
| 1280px layout | Full shell, 5-up team grid, hero at clamp ceiling |

Two defects were found and fixed during this verification rather than being
passed downstream:

1. The talk-card person column was sized to the avatar (112px), which wrapped
   "Andrei Kuznetsov" onto two lines and his title onto three. Corrected to
   `minmax(150px, 168px)`; §6.2 carries the fixed value.
2. The speakers table overflowed the viewport at 320px (379px against 320px).
   The column discipline in §6.5 was tightened until the table fits unaided, with
   the scroll wrapper demoted to a genuine safety net.

---

## 13. Open items for other roles

| Item | Owner |
|---|---|
| `archive.main.filter.no_results` and error/retry panel strings, in `ru`/`en`/`et` | Technical Writer |
| Confirm `rel="noopener noreferrer"` on every `target="_blank"` | Security Engineer |
| axe-core dependency approval for the automated a11y scan | Quality Engineer |
| Logo asset stays as-is; no refresh needed for this direction | Design — closed |
