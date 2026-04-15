# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Angular 11 single-page site that serves both `devclub.eu` and `devclub.ee`. The same codebase is built into two different deployments by swapping the `environment.*.ts` file at build time (see `angular.json` `fileReplacements`). Node 16 (see `.run/start_eu.run.xml`).

## Commands

```bash
npm run start:eu          # dev server for devclub.eu on :3000 (default)
npm run start:ee          # dev server for devclub.ee on :3000
npm run build:prod:eu     # production build for EU
npm run build:prod:ee     # production build for EE
npm run lint              # tslint via ng lint
```

There is no test runner configured — `ng test` / `ng e2e` are not wired up.

The CI (`wercker.yml`) runs `npm run build:prod:$CONF` where `$CONF` is `eu` or `ee`, then `scp`s `dist/*` to the target server.

## Architecture

### EU vs EE build configurations

- `src/environments/environment.dev-eu.ts` is the "canonical" environment imported directly in `.ts` source code. The Angular build (`angular.json`) rewrites that import to `environment.dev-ee.ts`, `environment.prod-eu.ts`, or `environment.prod-ee.ts` depending on `--configuration`.
- Each environment file holds three values: `production` (toggles `enableProdMode()` in `main.ts`), `config` (URL to a JSON config file), `googleAnalyticsKey`.
- Dev and prod envs point at the **same** content JSON (`eu_conf.json` / `ee_conf.json`). They differ only in the `production` flag and `googleAnalyticsKey` (left `undefined` in dev so local sessions don't pollute analytics). There is no separate "dev dataset" — when editing a component locally, you see the same data the live site sees.
- All site content (meetings, speakers, sponsors, team, resources) is fetched at runtime from JSON files hosted at `https://devclub.github.io/data/` — the Angular app itself contains no content. Changing content means changing that data repo, not this one.

### App bootstrap flow

1. `AppModule` registers an `APP_INITIALIZER` (`initialize` in `app.module.ts`) that blocks bootstrap until `DataHttpService.getInitial()` resolves.
2. `getInitial()` first fetches the top-level config JSON (URL from `environment.config`), then in parallel fetches advertising, team, and the main meetings list (URLs come from the config itself).
3. Results populate three singleton contexts: `AppContext` (config + advertising + team), `ArchiveContext` (meetings), `NextMeetingsContext` (derived upcoming meetings).
4. `AppContext.processData()` rewrites relative image/logo paths into absolute URLs using the prefixes from the config.
5. `AppComponent` reads the `?lang=` query param and hands it to `TranslationService`.

If you add a new piece of data that must be available before routing, extend `DataHttpService.getInitial()` and the `initialize` factory together — do not fetch it inside a component constructor, or it will race the first render.

### Routing and pages

Hash-based routing (`useHash: true`), all modules eagerly loaded (`PreloadAllModules`). Top-level routes in `src/app/app.routes.ts`:

- `/` → `DcMainPageComponent`
- `/archive` → `DcArchiveContainerPageComponent` (guarded by `ArchivePageGuard`) with children `best`, `speaker`, `seminar`
- `/advertising`, `/about`, `/speaker`

Guards in `src/app/guard/` gate archive pages on config state (e.g. archive availability).

### i18n

`TranslationService` loads `src/app/translations/data/{en,et,ru}.json` at startup. `TranslatePipe` looks up by message code; `LocalizePipe` / `LocalizeOrgPipe` pick the right localized field from config objects. Language is chosen from the `lang` query param, falling back to `config.defaultLang`.

### HTTP caching

`CachedHttpService` (separate from `DataHttpService`) stores GET responses in `localStorage` keyed by URL. The cache is invalidated every 6 hours via a single `CACHED_DATE` timestamp — on construction it wipes `localStorage` if expired. Use this for optional lazy content, not for the initial bootstrap JSON.

### Models and conventions

- All DTO classes live in `src/app/models/` as `*.model.ts`, matching the shape of the JSON served from `devclub.github.io/data/`. Changing a model usually means the data repo changed too.
- Component selectors are kebab-case with `dc-` prefix; directive selectors are camelCase with `dc` prefix (enforced by tslint `component-selector` / `directive-selector`).
- Component files are colocated as `*.component.ts` / `.html` / `.css` (no SCSS). `styleext: css` in `angular.json`.
- tslint enforces 140-char lines, single quotes, semicolons, `prefer-const`, no `console.debug/info/time/trace`.
