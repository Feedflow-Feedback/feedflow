describe("Test Overlay UI", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");
    cy.get('div[id="basicOverlay"]').should("be.visible");

    //open & close feedback add overlay
    cy.get('img[alt="Add Icon"]').click();
    cy.get('div[id="extendedOverlay"]').should("be.visible");
    cy.get('img[alt="Close Icon"]').click();
    cy.get('div[id="basicOverlay"]').should("be.visible");

    //open & close feedback list overlay
    cy.get('img[alt="Feedback List Icon"]').click();
    cy.get('div[id="feedbackOverlay"]').should("be.visible");
    cy.get('img[alt="Close"]').click();
    cy.get('div[id="basicOverlay"]').should("be.visible");

    //open & close tutorial overlay
    cy.get('img[alt="Question Icon"]').click();
    cy.get('div[id="tutorialOverlay"]').should("be.visible");
    cy.get('img[alt="Close"]').click();
    cy.get('div[id="basicOverlay"]').should("be.visible");
  });
});
