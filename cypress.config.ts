import { defineConfig } from "cypress";

export default defineConfig({
    video: false,
    retries: { runMode: 2, openMode: 0 },
    defaultCommandTimeout: 10000,
    e2e: {
        baseUrl: "https://www.demoblaze.com",
        specPattern: "cypress/e2e/**/*.cy.ts",
        env: {
            apiBaseUrl: "https://simple-books-api.glitch.me"
        },
        setupNodeEvents(on, config) { return config; }
    }
});
