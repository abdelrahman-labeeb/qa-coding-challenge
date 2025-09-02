import homePage from "../selectors/homePage";
import {faker} from "@faker-js/faker";

describe("Demoblaze Contact tests", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("User can send a contact message successfully", () => {
        cy.clickButton(homePage.contactButton, 'Contact')

        // Fill out the contact form
        cy.fillInput(homePage.contactEmailField, `user_${Date.now()}`);
        cy.fillInput(homePage.contactNameField, faker.person.fullName());
        cy.fillInput(homePage.contactMessageField, 'Hello from Cypress!');

        cy.clickButtonContainsTxt('Send message');

        // Expect success alert
        cy.on('window:alert', function handler(txt: string) {
            expect(txt).to.contain('Thanks for the message!!');
            cy.off('window:alert', handler); // removes after one trigger
        });
    });
});
