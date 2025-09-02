import homePage from "../../e2e/selectors/homePage";
import productPage from "../../e2e/selectors/productPage";

Cypress.Commands.add("addProductsToCart", (numberOfProductsToAdd: number = 1) => {
    cy.get(homePage.productTitle).should("have.length.greaterThan", 0);
    for (let i = 0; i < numberOfProductsToAdd; i++) {
        cy.get(homePage.productTitle).eq(i).should("be.visible").and("not.be.disabled");
        cy.get(homePage.productTitle).eq(i).click();

        cy.clickButton(productPage.addToCartButton, "Add to cart");

        cy.on('window:alert', function handler(txt: string) {
            expect(txt).to.contain('Product added.');
            cy.off('window:alert', handler); // removes after one trigger
        });

        cy.window().its('document.readyState').should('eq', 'complete');

        // back to home page
        cy.clickButton(homePage.websiteLogo)
    }
});
