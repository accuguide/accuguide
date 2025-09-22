describe('search page loads', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.title().should(
      'include',
      'Accuguide - Discover accessible places and services',
    )
  })

  it('successfully searches', () => {
    cy.get('input[id="search-full"]').type('Ramen Nagi')
    cy.get('button[type="submit"]').click()
    cy.contains('Ramen Nagi').click()
    cy.get('h1').should('contain', 'Ramen Nagi')
  })
})
