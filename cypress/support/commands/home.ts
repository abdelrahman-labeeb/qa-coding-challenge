Cypress.Commands.add("addProductsToCart", (numberOfProductsToAdd: number = 1) => {
    cy.get(".card-title a").should("have.length.greaterThan", 0);
    for (let i = 0; i < numberOfProductsToAdd; i++) {
        cy.get(".card-title a").eq(i).should("be.visible").and("not.be.disabled");
        cy.get(".card-title a").eq(i).click({force: true});

        cy.contains("#tbodyid > div.row > div > a", "Add to cart")
            .should("be.visible").and("not.be.disabled");

        cy.contains("#tbodyid > div.row > div > a", "Add to cart")
            .should("be.visible").and("not.be.disabled");

        cy.contains("#tbodyid > div.row > div > a", "Add to cart").click({force: true});

        cy.on('window:alert', function handler(txt: string) {
            expect(txt).to.contain('Product added.');
            cy.off('window:alert', handler); // removes after one trigger
        });

        cy.window().its('document.readyState').should('eq', 'complete');

        // back to home page
        cy.contains("#nava", "PRODUCT STORE")
            .should("be.visible").and("not.be.disabled");
        cy.contains("#nava", "PRODUCT STORE").click({force: true});
    }
});
