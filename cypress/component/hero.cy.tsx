import Hero from '@/components/landing/hero'

describe('Hero Component Testing', () => {
  it('Renders the Hero component', () => {
    cy.mount(<Hero />)
  })
})
