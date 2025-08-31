Cypress.Commands.add("fillLoginModalAndSubmit", (username: string, password: string) => {
    cy.clickButton("#login2")

    cy.get('#logInModal').should('be.visible');

    cy.fillInput("#loginusername", username)
    cy.fillInput("#loginpassword", password)
    cy.clickButton("#logInModal > div > div > div.modal-footer > button.btn.btn-primary", "Log in")
});

Cypress.Commands.add("login", (username: string, password: string) => {
    cy.fillLoginModalAndSubmit(username, password);
    cy.contains("#nameofuser", username);
});

/*
* Wrong username: User does not exist.
* Wrong password: Wrong password.
* No username/password: Please fill out Username and Password.
*/
Cypress.Commands.add("loginWithInvalidCredentials", (username: string, password: string, errMsg: string) => {
    cy.fillLoginModalAndSubmit(username, password);
    cy.get("#logInModal").should("be.visible");
    cy.on('window:alert', function handler(txt: string) {
        expect(txt).to.contain(errMsg);
        cy.off('window:alert', handler); // removes after one trigger
    });
});
