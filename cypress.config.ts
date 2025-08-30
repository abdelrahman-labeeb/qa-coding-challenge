import { defineConfig } from "cypress";
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter'


export default defineConfig({
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        reporterEnabled: 'spec, mocha-junit-reporter',
        reportDir: 'cypress/results/reports',
        mochaJunitReporterReporterOptions: {
            mochaFile: 'results/junit/results-[hash].xml',
            toConsole: true
        }
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
        setupNodeEvents(on, config) {
            console.log('[CTR] installLogsPrinter attached');
            installLogsPrinter(on, {
                printLogsToConsole: 'always',
                includeSuccessfulHookLogs: false,
                outputRoot: "results/ctr",
                outputTarget: {
                    "cypress-terminal-report.txt": "txt",
                    "cypress-terminal-report.json": "json",
                }
            })
            return config
        }
    }
});
