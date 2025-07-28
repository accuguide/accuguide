describe('search page loads', () => {
  it('passes', () => {
    // Set up intercept BEFORE visiting the page
    cy.intercept('GET', '/api/search/?query=test', {
      fixture: 'search.json',
    }).as('searchResults')

    cy.visit('/search/?query=test')
    cy.title().should('include', 'Search | Accuguide - Discover accessibility')

    // Wait for the API call to be intercepted
    cy.wait('@searchResults')

    // Verify the fixture data is displayed
    cy.contains('Sunrise Medical Center').should('be.visible')
    cy.contains('123 Main Street').should('be.visible')
  })
})
