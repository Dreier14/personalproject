

// describe('First Test', ()=>{
//     it('Visits the app', () => {
//         cy.visit('http://localhost:3000/country')
       
//     });
// });

describe('Second test', () => {
    it('Gets, types and asserts', ()=>{
        cy.visit('http://localhost:3000/countries')
        cy.get('button.button').click()
    })
    
})

describe('Third test', () => {
    it('Gets, types and asserts', ()=>{
        cy.visit('http://localhost:3000/countries/Thailand/cities')
        cy.get('.input-periphs')
    })
    
})

describe('Fourth test', () => {
    it('Gets, types and asserts', ()=>{
        cy.visit('http://localhost:3000')
        cy.get(':nth-child(6) > a').click()
        cy.visit('https://dreier14.auth0.com/login?state=b6vEYbDNJkXzbvakI0l7lhwYLQ4Z8rvt&client=HSGeCvoT6CJhMefrL1XPOGzS52WFFEkB&protocol=oauth2&scope=openid%20profile%20email&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&response_type=code').get('div.auth0-lock-social-button-text').click()
        cy.visit('http://localhost:3000/profile#_=_')
    })
    
})


