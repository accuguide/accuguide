/// <reference types="cypress" />

Cypress.Commands.add('openSite', () => {
  cy.visit('/')
  cy.title().should(
    'include',
    'Accuguide - Discover accessible places and services',
  )
})

declare global {
  namespace Cypress {
    interface Chainable {
      openSite(): Chainable<void>
    }
  }
}
export {}
