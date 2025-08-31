import {generateOrderInfo} from "../utils";

Cypress.Commands.add("openCartAndValidateTotalOrderPrice", (numberOfProductsAddedToCart: number = 1) => {
    cy.contains("#cartur", "Cart").should("be.visible").and("not.be.disabled");
    cy.contains("#cartur", "Cart").click({ force: true });

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

    cy.contains("button", "Place Order").should("be.visible").and("not.be.disabled");
    cy.contains("button", "Place Order").click({ force: true });

    cy.get('#orderModal').should('be.visible');

    cy.get("#name").should("exist").and("be.visible").and("not.be.disabled");
    cy.get("#name").type(orderInfo.customerFullName, {force: true});
    cy.get('#name').should('have.value', orderInfo.customerFullName);

    cy.get("#country").type(orderInfo.country, {force: true});
    cy.get("#country").should("have.value", orderInfo.country);

    cy.get("#city").type(orderInfo.city, {force: true});
    cy.get("#city").should("have.value", orderInfo.city);

    cy.get("#card").type(orderInfo.creditCardNumber, {force: true});
    cy.get("#card").should("have.value", orderInfo.creditCardNumber);

    cy.get("#month").type(orderInfo.expiryMonth, {force: true});
    cy.get("#month").should("have.value", orderInfo.expiryMonth);

    cy.get("#year").type(orderInfo.expiryYear, {force: true});
    cy.get("#year").should("have.value", orderInfo.expiryYear);
});

Cypress.Commands.add("submitOderAndConfirmSuccessfulPurchase", () => {
    // once order successfully completed, this request is fired to clear cart
    cy.intercept('POST', 'https://api.demoblaze.com/deletecart').as('deleteCart');

    cy.contains("button", "Purchase").should("not.be.disabled");
    cy.contains("button", "Purchase").click({ force: true });

    cy.contains("Thank you for your purchase").should("be.visible");

    cy.contains("OK").should("be.visible").and("not.be.disabled");
    cy.contains("OK").click({ force: true });

    cy.wait('@deleteCart').its('response.statusCode').should('eq', 200)


    cy.visit("/");
    cy.window().its('document.readyState').should('eq', 'complete');
    cy.get("#cat").should("be.visible").and("not.be.disabled");

    cy.contains("Cart").should("be.visible").and("not.be.disabled");
    cy.contains("Cart").click({ force: true });

    cy.get("#tbodyid tr").should("have.length", 0);
});
