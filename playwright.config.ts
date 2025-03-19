import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';
require('dotenv').config();

export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://www.amazon.com/',
    globalURL: 'https://www.amazon.com/', //FallBack if URL is missing from env
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'production',
      use: { ...devices['Desktop Chrome'],baseURL: 'https://www.amazon.com/' },
    }
  ],
});
