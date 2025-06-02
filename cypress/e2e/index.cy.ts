describe("index page loads", () => {
  it("passes", () => {
    cy.visit("/");
    cy.title().should("include", "Accuguide");
  });
});
