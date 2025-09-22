describe('Sign In E2E Testing', () => {
  beforeEach(() => {
    cy.openSite()
  })

  it('Successfully signs in with seeded user', () => {
    cy.contains('Sign In').click()
    cy.contains('Sign up').click()
    cy.wait(2000)
    const unique = Date.now().toString()
    cy.get('input[type="email"]').type(`${unique}@accuguide.org`)
    cy.get('input[type="password"]').type('Password1!')
    cy.get('input[name="username"]').type(`user-${unique}`)
    cy.get('button[type="submit"]').click()
  })
})
