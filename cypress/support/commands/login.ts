import homePage from "../../e2e/selectors/homePage";

Cypress.Commands.add("fillLoginModalAndSubmit", (username: string, password: string) => {
    cy.clickButton(homePage.naviLoginButton)

    cy.get(homePage.loginOverlay).should('be.visible');

    cy.fillInput(homePage.loginOverlayUsernameField, username)
    cy.fillInput(homePage.loginOverlayPasswordField, password)
    cy.clickButton(homePage.loginOverlayLoginButton, "Log in")
});

Cypress.Commands.add("login", (username: string, password: string) => {
    cy.fillLoginModalAndSubmit(username, password);
    cy.contains(homePage.naviNameOfUserButton, username);
});

/*
* Wrong username: User does not exist.
* Wrong password: Wrong password.
* No username/password: Please fill out Username and Password.
*/
Cypress.Commands.add("loginWithInvalidCredentials", (username: string, password: string, errMsg: string) => {
    cy.fillLoginModalAndSubmit(username, password);
    cy.get(homePage.loginOverlay).should("be.visible");

    cy.on('window:alert', function handler(txt: string) {
        expect(txt).to.contain(errMsg);
        cy.off('window:alert', handler); // removes after one trigger
    });
});
