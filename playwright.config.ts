import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Opt out of parallel tests on CI. */
  workers: undefined,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    ...devices["Desktop Chrome"],
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "deckOfCards",
      testDir: "./playwright/deckOfCards",
      use: {
        baseURL: "https://deckofcardsapi.com",
      },
    },
    {
      name: "coffee",
      testDir: "./playwright/coffee",
      use: {
        baseURL: "https://coffee.softr.app",
      },
    },
  ],
});
