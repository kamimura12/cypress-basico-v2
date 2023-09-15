Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Alexandre')

    cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Kamimura')

    cy.get('input[id="email"]')
        .should('be.visible')
        .type('kamimura@email.com')

    cy.get('textarea')
        .should('be.visible')
        .type('Que curso bom!')

    cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()
})