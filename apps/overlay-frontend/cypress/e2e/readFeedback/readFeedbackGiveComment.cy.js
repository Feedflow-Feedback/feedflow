describe("read Feedback & give Comment", () => {
  it("Opens Feedback Detial Overlay", () => {
    cy.visit("http://localhost:5173");

    // give specific feedback
    cy.get('svg[data-cy="Add Icon"]').click();
    cy.get('div[data-cy="extendedOverlay"]').should("be.visible");
    cy.get('svg[data-cy="Feedback Text Icon"]').click();
    cy.get('p[data-cy="exampleElement"]').click();
    cy.get('input[data-cy="feedback_Author"]').click();
    cy.get('input[data-cy="feedback_Author"]').type(
      "Its Me the Feedback Author"
    );
    cy.get('input[data-cy="feedback_AuthorEmail"]').click();
    cy.get('input[data-cy="feedback_AuthorEmail"]').type("email@author.com");
    cy.get('input[data-cy="feedback_Title"]').click();
    cy.get('input[data-cy="feedback_Title"]').type("This is my feedback.");
    cy.get('textarea[data-cy="feedback_Description"]').type(
      "This is my feedback. Text Lorem Ipsum"
    );
    cy.get('button[type="submit"]').click();

    //read given Feedback

    cy.get('svg[data-cy="Close Icon"]').click();
    cy.get('svg[data-cy="Feedback List Icon"]').click();
    cy.contains("Its Me the Feedback Author").should("exist");
    cy.get('button[data-cy="Add Comment Button"]').first().click();
    cy.get('input[data-cy="name"]').click();
    cy.get('input[data-cy="name"]').type("Its Me the Feedback Author");
    cy.get('input[data-cy="email"]').click();
    cy.get('input[data-cy="email"]').type("email@author.com");
    cy.get('textarea[data-cy="comment"]').click();
    cy.get('textarea[data-cy="comment"]').type("New comment from me");
    cy.get('button[data-cy="Save"]').first().click();
    cy.get('p[data-cy="Show Comments"]').first().click();
    cy.contains("New comment from me").should("exist");
  });
});
