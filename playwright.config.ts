import { defineConfig, devices } from '@playwright/test';

/**
 * The app is a dual-site build: the same code serves devclub.eu (EU) and
 * devclub.ee (EE) on two ports. Each Playwright project targets one site so a
 * single test file covers both.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 0,
  reporter: process.env['CI'] ? [['github'], ['html', { open: 'never' }]] : [['list']],
  use: {
    trace: 'on-first-retry',
    // Third-party social/analytics widgets are non-deterministic and irrelevant
    // to navigation; tests block them in a fixture (see e2e/fixtures.ts).
  },
  projects: [
    {
      name: 'eu',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3000' },
      metadata: { site: 'eu', hasTop: true, lang: 'ru' }
    },
    {
      name: 'ee',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3001' },
      metadata: { site: 'ee', hasTop: false, lang: 'en' }
    }
  ],
  webServer: [
    {
      command: 'npm run start:eu',
      url: 'http://localhost:3000/',
      reuseExistingServer: !process.env['CI'],
      timeout: 180_000
    },
    {
      command: 'npm run start:ee',
      url: 'http://localhost:3001/',
      reuseExistingServer: !process.env['CI'],
      timeout: 180_000
    }
  ]
});
