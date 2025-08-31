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

        cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCartRequest');

        cy.on("window:alert", (txt) => expect(txt).to.contains("Product added"));

        cy.wait('@addToCartRequest')

        // back to home page
        cy.contains("#nava", "PRODUCT STORE")
            .should("be.visible").and("not.be.disabled");
        cy.contains("#nava", "PRODUCT STORE").click({force: true});
    }
});
