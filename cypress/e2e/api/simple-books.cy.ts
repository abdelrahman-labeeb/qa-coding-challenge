import {faker} from "@faker-js/faker";

const baseUrl = Cypress.env("apiBaseUrl");

function registerClient() {
    return cy.request({
        method: "POST",
        url: `${baseUrl}/api-clients`,
        body: {
            clientName: faker.person.fullName(),
            clientEmail: `qa+${Date.now()}@example.com`,
        }
    }).its("body").then(b => b.accessToken as string);
}

describe("Simple Books API", () => {
    let token: string;
    let availableBookId: number;

    before(() => {
        cy.request(`${baseUrl}/status`).its("status").should("eq", 200);
        cy.request(`${baseUrl}/books?limit=5`).its("body").then((books) => {
            expect(books).to.be.an("array").and.not.empty;
            availableBookId = books[0].id;
        });
        // auth
        registerClient().then((t) => (token = t));
    });

    it("list books with limit & returns N items", () => {
        cy.request(`${baseUrl}/books?limit=3`).then((r) => {
            expect(r.status).to.eq(200);
            expect(r.body).to.have.length(3);
        });
    });

    it("create, get, update, delete an order", () => {
        cy.request({
            method: "POST",
            url: `${baseUrl}/orders`,
            headers: {Authorization: `Bearer ${token}`},
            body: {
                bookId: availableBookId,
                customerName: faker.person.fullName(),
            },
        })
            .then(({status, body}) => {
                expect(status).to.eq(201);
                expect(body).to.have.property("created", true);
                expect(body).to.have.property("orderId").that.is.a("string");
                return body.orderId;
            })
            .then((orderId) => {
                return cy.request({
                    url: `${baseUrl}/orders/?id=${orderId}`,
                    headers: {Authorization: `Bearer ${token}`},
                }).its("status").should("eq", 200).then(() => orderId);
            })
            .then((orderId) => {
                return cy.request({
                    method: "PATCH",
                    url: `${baseUrl}/orders/${orderId}`,
                    headers: {Authorization: `Bearer ${token}`},
                    body: {customerName: faker.person.fullName()},
                }).its("status").should("eq", 204).then(() => orderId);
            })
            .then((orderId) => {
                return cy.request({
                    method: "DELETE",
                    url: `${baseUrl}/orders/${orderId}`,
                    headers: {Authorization: `Bearer ${token}`},
                }).its("status").should("eq", 204);
            });
    });

    it("unauthorized order creation", () => {
        cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: `${baseUrl}/orders`,
            body: {bookId: availableBookId, customerName: "No Token"}
        }).then((r) => expect(r.status).to.eq(401));
    });

    it("invalid limit parameter", () => {
        cy.request({
            failOnStatusCode: false,
            url: `${baseUrl}/books?limit=999`
        }).then((r) => expect(r.status).to.eq(400));
    });

    it("non-existent book id", () => {
        cy.request({
            failOnStatusCode: false,
            url: `${baseUrl}/books/999999`
        }).then((r) => expect(r.status).to.eq(404));
    });
})
;
