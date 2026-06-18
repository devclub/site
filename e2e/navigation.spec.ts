import { test, expect, gotoHash } from './fixtures';

type Lang = 'ru' | 'en' | 'et';
interface Meta {
  site: string;
  hasTop: boolean;
  lang: Lang;
}

interface RouteCheck {
  hash: string;
  marker: string;
  urlPattern: RegExp;
  euOnly?: boolean;
}

/** Every route in the app, with a stable per-route element that proves it rendered. */
const ROUTES: RouteCheck[] = [
  { hash: '/', marker: 'dc-meeting-block', urlPattern: /#\/(\?|$)/ },
  { hash: '/archive', marker: 'select#season', urlPattern: /#\/archive/ },
  { hash: '/archive/best', marker: 'ul.nav-tabs', urlPattern: /#\/archive\/best/, euOnly: true },
  { hash: '/archive/speaker', marker: 'table.table-hover', urlPattern: /#\/archive\/speaker/ },
  { hash: '/archive/seminar', marker: 'table.table-bordered', urlPattern: /#\/archive\/seminar/ },
  { hash: '/advertising', marker: '.card-header', urlPattern: /#\/advertising/ },
  { hash: '/about', marker: 'dc-short-info-block', urlPattern: /#\/about/ },
  { hash: '/speaker', marker: 'a.btn-danger[target="_blank"]', urlPattern: /#\/speaker/ }
];

const MENU: Record<Lang, Record<string, string>> = {
  ru: { meeting: 'Встреча', archive: 'Архив', advertising: 'Реклама', about: 'О нас', speaker: 'Выступи!' },
  en: { meeting: 'Meeting', archive: 'Archive', advertising: 'Advertising', about: 'About', speaker: 'Talk!' },
  et: { meeting: 'Üritused', archive: 'Arhiiv', advertising: 'Reklaam', about: 'Meist', speaker: 'Osale!' }
};

const TABS: Record<Lang, Record<string, string>> = {
  ru: { main: 'Встречи', seminar: 'Семинары', best: 'Лучшие', speaker: 'Выступающие' },
  en: { main: 'Meetings', seminar: 'Seminars', best: 'The Best', speaker: 'Speakers' },
  et: { main: 'Kõned', seminar: 'Seminarid', best: 'Parimad', speaker: 'Esinejad' }
};

function meta(testInfo: { project: { metadata?: unknown } }): Meta {
  return testInfo.project.metadata as Meta;
}

test.describe('paths render directly', () => {
  for (const route of ROUTES) {
    test(`GET ${route.hash} renders its content`, async ({ page, pageErrors }, testInfo) => {
      const { hasTop } = meta(testInfo);
      test.skip(!!route.euOnly && !hasTop, 'the "Best" tab only exists where hasTop is true (EU)');

      await gotoHash(page, route.hash);
      await expect(page).toHaveURL(route.urlPattern);
      await expect(page.locator(route.marker).first()).toBeVisible({ timeout: 15000 });
      expect(pageErrors, 'no uncaught errors: ' + pageErrors.join(' | ')).toEqual([]);
    });
  }
});

test('navbar menu links navigate to their routes (regression: clicking did nothing)', async ({ page }, testInfo) => {
  const { lang } = meta(testInfo);
  const menu = MENU[lang];

  // Start on a non-home page so a Meeting click is observable too.
  await gotoHash(page, '/about');

  await page.getByRole('link', { name: menu.archive, exact: true }).click();
  await expect(page).toHaveURL(/#\/archive/);
  await expect(page.locator('select#season')).toBeVisible();

  await page.getByRole('link', { name: menu.advertising, exact: true }).click();
  await expect(page).toHaveURL(/#\/advertising/);
  await expect(page.locator('.card-header').first()).toBeVisible();

  await page.getByRole('link', { name: menu.about, exact: true }).click();
  await expect(page).toHaveURL(/#\/about/);
  await expect(page.locator('dc-short-info-block')).toBeVisible();

  await page.getByRole('button', { name: menu.speaker, exact: true }).click();
  await expect(page).toHaveURL(/#\/speaker/);
  await expect(page.locator('a.btn-danger[target="_blank"]')).toBeVisible();

  await page.getByRole('link', { name: menu.meeting, exact: true }).click();
  await expect(page.locator('dc-meeting-block')).toBeVisible();
});

test('archive tabs switch sub-routes', async ({ page }, testInfo) => {
  const { lang, hasTop } = meta(testInfo);
  const tabs = TABS[lang];

  await gotoHash(page, '/archive');

  await page.getByRole('tab', { name: tabs.seminar, exact: true }).click();
  await expect(page).toHaveURL(/#\/archive\/seminar/);
  await expect(page.locator('table.table-bordered')).toBeVisible();

  await page.getByRole('tab', { name: tabs.speaker, exact: true }).click();
  await expect(page).toHaveURL(/#\/archive\/speaker/);
  await expect(page.locator('table.table-hover')).toBeVisible();

  if (hasTop) {
    await page.getByRole('tab', { name: tabs.best, exact: true }).click();
    await expect(page).toHaveURL(/#\/archive\/best/);
  }

  await page.getByRole('tab', { name: tabs.main, exact: true }).click();
  await expect(page).toHaveURL(/#\/archive(\/|;|\?|$)/);
  await expect(page.locator('select#season')).toBeVisible();
});

test('language switcher changes the UI language', async ({ page }) => {
  await gotoHash(page, '/');

  await page.getByRole('link', { name: 'ENG', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Archive', exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'РУС', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Архив', exact: true })).toBeVisible();

  await page.getByRole('link', { name: 'EST', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Arhiiv', exact: true })).toBeVisible();
});
