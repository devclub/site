import { test as base, expect, Page } from '@playwright/test';

/** Non-deterministic third-party widgets — blocked so tests stay stable and offline-ish. */
const BLOCK_HOSTS = [
  'connect.facebook.net',
  'www.facebook.com',
  'web.facebook.com',
  'buttons.github.io',
  'api.github.com',
  'apis.google.com',
  'www.googleapis.com',
  'youtube.com',
  'www.youtube.com',
  'youtube-nocookie.com',
  'googletagmanager.com',
  'www.googletagmanager.com',
  'google-analytics.com',
  'platform.twitter.com',
  'syndication.twitter.com'
];

function isBlocked(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return BLOCK_HOSTS.some((b) => host === b || host.endsWith('.' + b));
  } catch {
    return false;
  }
}

type Fixtures = {
  /** Uncaught exceptions captured during the test (must stay empty). */
  pageErrors: string[];
};

export const test = base.extend<Fixtures>({
  pageErrors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.stack || e.message));
    await page.route('**/*', (route) => {
      if (isBlocked(route.request().url())) {
        return route.abort();
      }
      return route.continue();
    });
    await use(errors);
  }
});

/** Navigate using the SPA hash router and wait for the app shell to be present. */
export async function gotoHash(page: Page, hash: string): Promise<void> {
  await page.goto('/#' + hash);
  await expect(page.locator('dc-root nav.navbar')).toBeVisible();
}

export { expect };
