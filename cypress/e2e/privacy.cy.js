it('testa a página da política de privacidade de forma independente', function(){
cy.visit('./src/privacy.html')

    const longText = 'Não salvamos dados submetidos no formulário da aplicação CAC TAT. Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real. No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino. Talking About Testing'
     cy.get('#title').contains('CAC TAT - Política de privacidade')  

     cy.get('#white-background').contains(longText)
})