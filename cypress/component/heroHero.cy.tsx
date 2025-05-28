import React from "react";
import Hero from "@/components/hero";

describe("<Hero />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Hero />);
  });
});
