describe('Search E2E Testing', () => {
  beforeEach(() => {
    cy.openSite()
  })

  it('Sucessfully searches for an entity', () => {
    cy.get('input[id="search-full"]').type('Ramen Nagi')
    cy.get('button[type="submit"]').click()
    cy.contains('Ramen Nagi').click()
    cy.wait(5000)
    cy.get('h1').should('contain', 'Ramen Nagi')
  })
})
