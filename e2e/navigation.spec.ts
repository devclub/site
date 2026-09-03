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

test('archive season switch refreshes the meeting list (regression: list stayed on active year)', async ({ page }) => {
  await gotoHash(page, '/archive');

  const season = page.locator('select#season');
  await expect(season).toBeVisible();

  // Collect the selectable years (the "all seasons" option is non-numeric).
  const years = (await season.locator('option').allInnerTexts())
    .map((t) => t.trim())
    .filter((t) => /^\d{4}$/.test(t));
  expect(years.length).toBeGreaterThan(1);

  const firstMeeting = page.locator('dc-meeting-info-list .text-muted span').first();

  await season.selectOption({ label: years[0] });
  await expect(firstMeeting).toBeVisible();
  const before = await firstMeeting.innerText();

  await season.selectOption({ label: years[1] });
  await expect(firstMeeting).toBeVisible();
  await expect(firstMeeting).not.toHaveText(before);
});

test('page titles remain projected into a single meaningful h1', async ({ page }) => {
  for (const hash of ['/archive', '/advertising', '/speaker']) {
    await gotoHash(page, hash);
    const heading = page.locator('main h1');
    await expect(heading).toHaveCount(1);
    await expect(heading).not.toHaveText('');
  }
});

test('archive view toggles have stable accessible names', async ({ page }) => {
  await gotoHash(page, '/archive');
  const buttons = page.locator('#view button');

  await expect(buttons).toHaveCount(2);
  await expect(buttons.nth(0)).toHaveAttribute('aria-label', /\S+/);
  await expect(buttons.nth(1)).toHaveAttribute('aria-label', /\S+/);
});

test('skip navigation focuses main without changing the hash route', async ({ page }) => {
  await gotoHash(page, '/archive');
  const hash = new URL(page.url()).hash;
  const skipLink = page.getByRole('button', { name: 'Skip to content' });

  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();
  await page.keyboard.press('Enter');

  await expect(page.locator('main')).toBeFocused();
  expect(new URL(page.url()).hash).toBe(hash);
});

test('rendered images expose alt text decisions and intrinsic dimensions', async ({ page }) => {
  for (const hash of ['/', '/archive']) {
    await gotoHash(page, hash);
    const invalidImages = await page.locator('img').evaluateAll((images) =>
      images
        .filter((image) =>
          image.getAttribute('alt') === null ||
          Number(image.getAttribute('width')) <= 0 ||
          Number(image.getAttribute('height')) <= 0
        )
        .map((image) => image.getAttribute('src'))
    );
    expect(invalidImages).toEqual([]);
  }
});
