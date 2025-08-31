import { faker } from "@faker-js/faker";

Cypress.Commands.add("signup", (u?: string, p?: string) => {
    const username = u ?? `user_${Date.now()}`;
    const password = p ?? faker.internet.password({ length: 10 });

    cy.clickButton("#signin2");

    cy.get('#signInModal').should('be.visible');

    cy.fillInput("#sign-username", username)
    cy.fillInput("#sign-password", password)

    cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupRequest');

    cy.clickButton("#signInModal > div > div > div.modal-footer > button.btn.btn-primary", "Sign up");

    cy.wait('@signupRequest')

    cy.on('window:alert', function handler(txt: string) {
        expect(txt).to.contain('Sign up successful.');
        cy.off('window:alert', handler); // removes after one trigger
    });

    cy.window().its('document.readyState').should('eq', 'complete');

    return cy.wrap({ username, password });
});
