Cypress.Commands.add("login", (username: string, password: string) => {
    cy.get("#login2").should("be.visible").and("not.be.disabled");
    cy.get("#login2").click({ force: true });

    cy.get('#logInModal').should('be.visible');

    cy.get("#loginusername").should("exist").and("be.visible").and("not.be.disabled");
    cy.get("#loginusername").type(username, {force: true});
    cy.get('#loginusername').should('have.value', username);

    cy.get("#loginpassword").should("exist").and("be.visible").and("not.be.disabled");
    cy.get("#loginpassword").type(password, {force: true});
    cy.get('#loginpassword').should('have.value', password);

    cy.contains("#logInModal > div > div > div.modal-footer > button.btn.btn-primary", "Log in").click({ force: true });
    cy.contains("#nameofuser", username);
});
