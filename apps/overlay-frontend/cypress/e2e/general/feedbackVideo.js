describe("Test Overlay UI", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");
    cy.get('img[alt="Add Icon"]').click();
    cy.get('div[id="extendedOverlay"]').should("be.visible");
  });
});
