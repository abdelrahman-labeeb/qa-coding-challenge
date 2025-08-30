import { defineConfig } from "cypress";

export default defineConfig({
    reporterOptions: {
        reportDir: 'cypress/results/reports',
    },
    screenshotsFolder: 'cypress/results/screenshots',
    videosFolder: 'cypress/results/videos',
    retries: {
        runMode: 2,
        openMode: 0
    },
    defaultCommandTimeout: 10000,
    e2e: {
        baseUrl: "https://www.demoblaze.com",
        specPattern: "cypress/e2e/**/*.cy.ts",
        env: {
            apiBaseUrl: "https://simple-books-api.click"
        },
        setupNodeEvents(on, config) { return config; }
    }
});
