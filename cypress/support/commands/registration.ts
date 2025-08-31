import { faker } from "@faker-js/faker";
import homePage from "../../e2e/selectors/homePage";

Cypress.Commands.add("signup", (u?: string, p?: string) => {
    const username = u ?? `user_${Date.now()}`;
    const password = p ?? faker.internet.password({ length: 10 });

    cy.clickButton(homePage.naviSignupButton);

    cy.get(homePage.signupOverlay).should('be.visible');

    cy.fillInput(homePage.signupOverlayUsernameField, username)
    cy.fillInput(homePage.signupOverlayPasswordField, password)

    cy.intercept('POST', 'https://api.demoblaze.com/signup').as('signupRequest');

    cy.clickButton(homePage.signupOverlayLoginButton, "Sign up");

    cy.wait('@signupRequest')

    cy.on('window:alert', function handler(txt: string) {
        expect(txt).to.contain('Sign up successful.');
        cy.off('window:alert', handler); // removes after one trigger
    });

    cy.window().its('document.readyState').should('eq', 'complete');

    return cy.wrap({ username, password });
});
