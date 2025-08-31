describe("Demoblaze login tests", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("login with invalid username should fail", () => {
        const username = `user_${Date.now()}`;
        const password = "Secret123!";
        cy.signup(username, password)
            .then(() =>
                cy.loginWithInvalidCredentials("whateverusername123", password, "User does not exist."));
    });

    it("login with wrong password should fail", () => {
        const username = `user_${Date.now()}`;
        const password = "Secret123!";
        cy.signup(username, password)
            .then(() =>
                cy.loginWithInvalidCredentials(username, "password", "Wrong password."));
    });
});
