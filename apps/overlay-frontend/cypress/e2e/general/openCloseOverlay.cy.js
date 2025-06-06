describe("Test Overlay UI", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");
    cy.get('div[data-cy="basicOverlay"]').should("be.visible");

    //open & close feedback add overlay
    cy.get('svg[data-cy="Add Icon"]').click();
    cy.get('div[data-cy="extendedOverlay"]').should("be.visible");
    cy.get('svg[data-cy="Close Icon"]').click();
    cy.get('div[data-cy="basicOverlay"]').should("be.visible");

    //open & close feedback list overlay
    cy.get('svg[data-cy="Feedback List Icon"]').click();
    cy.get('div[data-cy="feedbackOverlay"]').should("be.visible");
    cy.get('svg[data-cy="Close"]').click();
    cy.get('div[data-cy="basicOverlay"]').should("be.visible");

    //open & close tutorial overlay
    cy.get('svg[data-cy="Question Icon"]').click();
    cy.get('div[data-cy="tutorialOverlay"]').should("be.visible");
    cy.get('svg[data-cy="Close"]').first().click();
    cy.get('div[data-cy="basicOverlay"]').should("be.visible");
  });
});
