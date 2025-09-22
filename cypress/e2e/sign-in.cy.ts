describe('Sign In E2E Testing', () => {
  beforeEach(() => {
    cy.openSite()
  })

  it('Successfully signs in with seeded user', () => {
    cy.contains('Sign In').click()
    cy.get('input[id="email"]').type('name@example.com')
    cy.get('input[id="password"]').type('password')
    cy.get('button[type="submit"]').click()
  })
})
