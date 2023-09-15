/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html') 
    })

    it('verifica o título da aplicação', function() {      
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
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
        .type(longText, {delay: 0})

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('.success')
        .should('be.visible')
        })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Alexandre')

        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Kamimura')

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('kamimuraemail.com')

        cy.get('textarea')
        .should('be.visible')
        .type('Que curso bom!')

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('.error')
        .should('be.visible')
    })
    it('se um valor não-numérico for digitado, seu valor continuará vazio', function(){
        cy.get('input[id="phone"]')
        .should('be.visible')
        .type('Telefone')
        .should('have.value', '')
    })    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Alexandre')

        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Kamimura')

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('kamimura@email.com')
        
        cy.get('#phone-checkbox').check()

        cy.get('textarea')
        .should('be.visible')
        .type('Que curso bom!')

        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('.error')
        .should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Alexandre').should('have.value', 'Alexandre')
        .clear().should('have.value', '')

        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Kamimura').should('have.value', 'Kamimura')
        .clear().should('have.value', '')

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('kamimura@email.com').should('have.value', 'kamimura@email.com')
        .clear().should('have.value', '')

        cy.get('#phone')
        .should('be.visible')
        .type('33242087').should('have.value', '33242087')
        .clear().should('have.value', '')
    })
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar')
        .should('be.visible')
        .click()

        cy.get('.error')
        .should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success')
        .should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('input[id="firstName"]')
        .should('be.visible')
        .type('Alexandre')

        cy.get('input[id="lastName"]')
        .should('be.visible')
        .type('Kamimura')
    
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')    

        cy.get('input[id="email"]')
        .should('be.visible')
        .type('kamimura@email.com')

        cy.get('textarea')
        .should('be.visible')
        .type('Que curso bom!')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('[type="radio"]').check('feedback')
        .should('be.checked')             
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('#email-checkbox').check()
        .should('be.checked')

        cy.get('#phone-checkbox').check().last()
        .should('be.checked')

        .uncheck()
        .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($drop){
            expect($drop[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')        
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
    })    
    })
 
   
