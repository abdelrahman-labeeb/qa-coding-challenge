import { faker } from "@faker-js/faker";

Cypress.Commands.add("signup", (u?: string, p?: string) => {
    const username = u ?? `user_${Date.now()}`;
    const password = p ?? faker.internet.password({ length: 10 });

    cy.get("#signin2").should("be.visible").and("not.be.disabled");
    cy.get("#signin2").click({ force: true });

    cy.get('#signInModal').should('be.visible');

    cy.get("#sign-username").should("exist").and("be.visible").and("not.be.disabled");
    cy.get("#sign-username").type(username, {force: true});
    cy.get('#sign-username').should("have.value", username);

    cy.get("#sign-password").should("exist").and("be.visible").and("not.be.disabled");
    cy.get("#sign-password").type(password, {force: true});
    cy.get('#sign-password').should("have.value", password);

    cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupRequest');

    cy.contains("#signInModal > div > div > div.modal-footer > button.btn.btn-primary", "Sign up")
        .click({ force: true });

    cy.wait('@signupRequest')

    cy.on('window:alert', (text) => {
        expect(text).to.contains("Sign up successful.");
    });

    cy.window().its('document.readyState').should('eq', 'complete');

    return cy.wrap({ username, password });
});
