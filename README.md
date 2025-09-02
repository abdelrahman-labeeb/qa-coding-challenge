# QA Coding Challenge

End-to-end tests written with Cypress + TypeScript.

The repository contains a standard Cypress setup with TypeScript configuration and a GitHub Actions workflow for CI. Notable top-level files/folders include:

- cypress/ – Cypress test suite (specs, fixtures, support files). 
GitHub

- cypress.config.ts – Cypress configuration (base URL, reporter, timeouts, spec patterns, etc.). 
GitHub

- tsconfig.json – TypeScript configuration used by Cypress tests. 
GitHub

- package.json / package-lock.json – Dependencies and (optionally) npm scripts. 
GitHub

- .github/workflows/ – CI pipeline for running tests on pushes/PRs.

## Project structure
```
cypress/
  e2e/           # test specs (*.cy.ts), selectors
  fixtures/      # static test data
  support/       # custom commands
cypress.config.ts
tsconfig.json
package.json
```

## How to run the tests
```
npm run cypress:run
```

## Run a single spec
```
# replace with spec path inside cypress/e2e
npx cypress run --spec "cypress/e2e/<your-spec>.cy.ts"
```

## Continuous Integration (CI)
GitHub Actions are configured under .github/workflows/ to run Cypress on pushes/PRs and also a daily scheduled run.

