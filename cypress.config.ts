import { defineConfig } from "cypress";

// TODO: Add reporter
export default defineConfig({
    screenshotsFolder: 'cypress/results/screenshots',
    videosFolder: 'cypress/results/videos',
    watchForFileChanges: false,
    retries: {
        runMode: 2,
        openMode: 0
    },
    defaultCommandTimeout: 10000,
    responseTimeout: 15000,
    e2e: {
        baseUrl: "https://www.demoblaze.com",
        specPattern: "cypress/e2e/**/*.cy.ts",
        supportFile: "cypress/support/e2e.ts",
        env: {apiBaseUrl: "https://simple-books-api.click"},
        setupNodeEvents(on, config) {
            return config
        }
    }
});
