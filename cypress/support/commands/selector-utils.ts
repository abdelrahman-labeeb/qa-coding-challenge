Cypress.Commands.add('fillInput', (selector: string, value: string) => {
    const input = cy
        .get(selector)
        .should('exist')
        .and('not.be.disabled');

    input.clear();

    input.type(value, )
        .should('have.value', value);
});

Cypress.Commands.add('clickButton', (selector: string, text?: string) => {
    let button

    if (text) {
        button = cy.contains(selector, text)
            .should('exist')
            .and('not.be.disabled');
    } else {
        button = cy.get(selector)
            .should('exist')
            .and('not.be.disabled');
    }

    button.click();
});

Cypress.Commands.add('clickButtonContainsTxt', (text: string) => {
    const button = cy.contains('button', text)
        .should('exist')
        .and('not.be.disabled');

    button.click();
});