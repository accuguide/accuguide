import Header from '@/components/header/header'

describe('Hero Component Testing', () => {
  it('Renders the Hero component', () => {
    cy.mount(<Header />)
  })
})
