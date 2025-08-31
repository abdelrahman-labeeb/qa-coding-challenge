describe("Demoblaze checkout tests", () => {
    const numberOfProductsToAdd = 3;

    beforeEach(() => {
        cy.visit("/");
    });

    it("create account, login, and purchase products", () => {
        cy.signup()
            .then((credentials) => cy.login(credentials.username, credentials.password))
            .then(() => cy.addProductsToCart(numberOfProductsToAdd))
            .then(() => cy.openCartAndValidateTotalOrderPrice(numberOfProductsToAdd))
            .then(() => cy.deleteProductFromCartAndValidateProductsSumPriceAndCartPrice(numberOfProductsToAdd - 1))
            .then(() => cy.fillOrderInfo())
            .then(() => cy.submitOderAndConfirmSuccessfulPurchase());
    });

    it("purchase with empty form should fail", () => {
        cy.clickButton("#cartur", "Cart");
        cy.clickButtonContainsTxt("Place Order");
        cy.get('#orderModal').should('be.visible');
        cy.contains("button", "Purchase").should("not.be.disabled");
        cy.contains("button", "Purchase").click({ force: true });

        cy.on('window:alert', function handler(txt: string) {
            expect(txt).to.contain('Please fill out Name and Creditcard.');
            cy.off('window:alert', handler); // removes after one trigger
        });
        cy.get("#orderModal").should("be.visible");
    });
});
