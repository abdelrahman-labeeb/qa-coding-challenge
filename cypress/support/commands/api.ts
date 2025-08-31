import { faker } from "@faker-js/faker";

Cypress.Commands.add("registerClient", () => {
    const baseUrl = Cypress.env("apiBaseUrl");

    return cy.request({
        method: "POST",
        url: `${baseUrl}/api-clients`,
        body: {
            clientName: faker.person.fullName(),
            clientEmail: `qa+${Date.now()}@example.com`,
        },
    }).then((response) => {
        expect(response.status).to.eq(201);
        let token: string = response.body?.accessToken;
        expect(token, "Access token should exist").to.be.a("string");
        return token;
    });
});
