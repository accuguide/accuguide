import Hero from '@/components/landing/hero'

describe('<Hero />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Hero />)
  })
})
