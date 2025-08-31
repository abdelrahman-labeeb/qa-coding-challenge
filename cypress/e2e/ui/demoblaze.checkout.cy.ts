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
});
