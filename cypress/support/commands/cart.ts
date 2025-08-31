import {generateOrderInfo} from "../utils";

Cypress.Commands.add("openCartAndValidateTotalOrderPrice", (numberOfProductsAddedToCart: number = 1) => {
    cy.clickButton("#cartur", "Cart");

    // sum price column and compare with displayed total
    cy.get("#tbodyid tr")
        .should("exist")
        .and("be.visible")
        .and("have.length", numberOfProductsAddedToCart);
    cy.validateProductsSumPriceAndCartPrice();
});

Cypress.Commands.add("deleteProductFromCartAndValidateProductsSumPriceAndCartPrice",
    (numberOfProductsInCart: number = 1) => {
        cy.get("#tbodyid tr").its("length").then(() => {
            cy.get("#tbodyid tr").first().contains("Delete").click({ force: true });
            cy.window().its('document.readyState').should('eq', 'complete');
            cy.get("#tbodyid tr").should("have.length", numberOfProductsInCart);
            cy.validateProductsSumPriceAndCartPrice()
        });
    });

Cypress.Commands.add("validateProductsSumPriceAndCartPrice", () => {
    cy.get("#tbodyid tr td:nth-child(3)")
        .then(($cells) => Cypress._.sum($cells.toArray().map(c => Number(c.innerText))))
        .then((sum) => {
            cy.get("#totalp").invoke("text")
                .then((t) => {
                    expect(Number(t)).to.eq(sum);
                });
        });
});

Cypress.Commands.add("fillOrderInfo", () => {
    const orderInfo = generateOrderInfo();

    cy.clickButtonContainsTxt("Place Order");

    cy.get('#orderModal').should('be.visible');

    cy.fillInput("#name", orderInfo.customerFullName);
    cy.fillInput("#country", orderInfo.country);
    cy.fillInput("#city", orderInfo.city);
    cy.fillInput("#card", orderInfo.creditCardNumber);
    cy.fillInput("#month", orderInfo.expiryMonth);
    cy.fillInput("#year", orderInfo.expiryYear);
});

Cypress.Commands.add("submitOderAndConfirmSuccessfulPurchase", () => {
    // once order successfully completed, this request is fired to clear cart
    cy.intercept('POST', 'https://api.demoblaze.com/deletecart').as('deleteCart');

    cy.contains("button", "Purchase").should("not.be.disabled");
    cy.contains("button", "Purchase").click({ force: true });

    cy.contains("Thank you for your purchase").should("be.visible");

    cy.clickButtonContainsTxt("OK");

    cy.wait('@deleteCart').its('response.statusCode').should('eq', 200)


    cy.visit("/");
    cy.window().its('document.readyState').should('eq', 'complete');
    cy.get("#cat").should("be.visible").and("not.be.disabled");

    cy.clickButton("#cartur");

    cy.get("#tbodyid tr").should("have.length", 0);
});
