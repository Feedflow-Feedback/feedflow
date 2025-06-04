describe("place Feedback successfully", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");
    cy.get('svg[data-cy="Add Icon"]').click();
    cy.get('div[data-cy="extendedOverlay"]').should("be.visible");
    cy.get('svg[data-cy="Feedback Text Icon"]').click();
    cy.get('p[data-cy="exampleElement"]').click();
    cy.get('input[data-cy="feedback_Author"]').click();
    cy.get('input[data-cy="feedback_Author"]').type("Example Author");
    cy.get('input[data-cy="feedback_AuthorEmail"]').click();
    cy.get('input[data-cy="feedback_AuthorEmail"]').type("email@author.com");
    cy.get('input[data-cy="feedback_Title"]').click();
    cy.get('input[data-cy="feedback_Title"]').type("This is my feedback.");
    cy.get('textarea[data-cy="feedback_Description"]').type(
      "This is my feedback. Text Lorem Ipsum"
    );
    cy.get('button[data-cy="submit"]').click();

    cy.get('div[class="feedback-red-circle"]').should("be.visible");
    cy.get('div[class="feedback-element-border"]').should("be.visible");
    cy.get('div[data-cy="dialog"]').should("not.exist");
  });
});
