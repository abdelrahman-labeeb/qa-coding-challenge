import homePage from "../selectors/homePage";

describe("Demoblaze logout tests", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("User can log out successfully", () => {
        cy.signup()
            .then((credentials) =>
                cy.login(credentials.username, credentials.password));

        cy.clickButton(homePage.naviLogoutButton);

        cy.get(homePage.naviLoginButton)
            .should('be.visible');
        cy.get(homePage.naviNameOfUserButton)
            .should('not.be.visible')
            .should('not.contain', 'Welcome');
    });
});
