import {generateOrderInfo} from "../utils";
import cartPage from "../../e2e/selectors/cartPage";
import homePage from "../../e2e/selectors/homePage";

Cypress.Commands.add("openCartAndValidateTotalOrderPrice", (numberOfProductsAddedToCart: number) => {
    cy.clickButton(homePage.cartButton);

    // sum price column and compare with displayed total
    cy.get(cartPage.orderOverview.productsRows)
        .should("exist")
        .and("be.visible")
        .and("have.length", numberOfProductsAddedToCart);
    cy.validateProductsSumPriceAndCartPrice();
});

Cypress.Commands.add("deleteProductFromCartAndValidateProductsSumPriceAndCartPrice",
    (numberOfProductsInCart: number) => {
        cy.get(cartPage.orderOverview.productsRows).its("length").then(() => {
            cy.get(cartPage.orderOverview.productsRows).first().contains("Delete").click();
            cy.window().its('document.readyState').should('eq', 'complete');
            cy.get(cartPage.orderOverview.productsRows).should("have.length", numberOfProductsInCart);
            cy.validateProductsSumPriceAndCartPrice()
        });
    });

Cypress.Commands.add("validateProductsSumPriceAndCartPrice", () => {
    cy.get(cartPage.orderOverview.productsPriceCells)
        .then(($cells) => Cypress._.sum($cells.toArray().map(c => Number(c.innerText))))
        .then((sum) => {
            cy.get(cartPage.totalOrderPrice).invoke("text")
                .then((t) => {
                    expect(Number(t)).to.eq(sum);
                });
        });
});

Cypress.Commands.add("fillOrderInfo", () => {
    const orderInfo = generateOrderInfo();

    cy.clickButton(cartPage.placeOrderButton)

    cy.get(cartPage.placeOrderOverlay.overlay).should('be.visible');

    cy.fillInput(cartPage.placeOrderOverlay.nameField, orderInfo.customerFullName);
    cy.fillInput(cartPage.placeOrderOverlay.countryField, orderInfo.country);
    cy.fillInput(cartPage.placeOrderOverlay.cityField, orderInfo.city);
    cy.fillInput(cartPage.placeOrderOverlay.creditCardField, orderInfo.creditCardNumber);
    cy.fillInput(cartPage.placeOrderOverlay.expiryMonthField, orderInfo.expiryMonth);
    cy.fillInput(cartPage.placeOrderOverlay.expiryYearField, orderInfo.expiryYear);
});

Cypress.Commands.add("submitOderAndConfirmSuccessfulPurchase", () => {
    // once order successfully completed, this request is fired to clear cart
    cy.intercept('POST', 'https://api.demoblaze.com/deletecart').as('deleteCart');

    cy.clickButton(cartPage.placeOrderOverlay.purchaseButton)

    cy.contains("Thank you for your purchase").should("be.visible");

    cy.clickButtonContainsTxt("OK");

    cy.wait('@deleteCart').its('response.statusCode').should('eq', 200)


    cy.visit("/");
    cy.window().its('document.readyState').should('eq', 'complete');
    cy.get(homePage.categoriesButton).should("exist").and("be.visible");

    cy.clickButton(homePage.cartButton);

    cy.get(cartPage.orderOverview.productsRows).should("have.length", 0);
});
